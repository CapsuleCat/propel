import fs from "node:fs";
import path from "node:path";
import type { Browser, LaunchOptions, Viewport } from "puppeteer";
import puppeteer from "puppeteer";
import url from "node:url";
import type mermaid from "mermaid";
import type { MermaidConfig } from "mermaid";

type Mermaid = typeof mermaid;

interface RunOptions {
    puppeteerConfig?: LaunchOptions;
    outputFormat?: string;
    parseMMDOptions?: ParseMDDOptions;
}

/**
 * Renders a mermaid diagram or mermaid markdown file.
 *
 * @param {string} [input] - If this ends with `.md`, path to a markdown file containing mermaid.
 * If this is a string, loads the mermaid definition from the given file.
 * If this is `undefined`, loads the mermaid definition from stdin.
 * @param {string} output - Path to the output file.
 * @param {object} [opts] - Options
 * @param {puppeteer.LaunchOptions} [opts.puppeteerConfig] - Puppeteer launch options.
 * @param {boolean} [opts.quiet] - If set, suppress log output.
 * @param {"svg" | "png" | "pdf"} [opts.outputFormat] - Mermaid output format.
 * Defaults to `output` extension. Overrides `output` extension if set.
 * @param {ParseMDDOptions} [opts.parseMMDOptions] - Options to pass to {@link parseMMDOptions}.
 */
export async function run(
    input: string,
    output: string,
    { puppeteerConfig = {}, outputFormat, parseMMDOptions }: RunOptions = {}
) {
    console.log("Running mermaid");
    const browser = await puppeteer.launch(puppeteerConfig);
    try {
        if (!outputFormat) {
            outputFormat = path.extname(output).replace(".", "");
        }
        if (outputFormat === "md") {
            // fallback to svg in case no outputFormat is given and output file is MD
            outputFormat = "svg";
        }
        if (!/(?:svg|png|pdf)$/.test(outputFormat)) {
            throw new Error(
                'Output format must be one of "svg", "png" or "pdf"'
            );
        }

        const definition = input;

        console.info("Generating single mermaid chart");
        const data = await parseMMD(
            browser,
            definition,
            outputFormat,
            parseMMDOptions
        );
        await fs.promises.writeFile(output, data);
    } finally {
        await browser.close();
    }
}

interface ParseMDDOptions {
    viewport?: Viewport;
    backgroundColor?: string;
    mermaidConfig?: MermaidConfig;
    myCSS?: string;
    pdfFit?: string;
}

/**
 * Parse and render a mermaid diagram.
 *
 * @param {puppeteer.Browser} browser - Puppeteer Browser
 * @param {string} definition - Mermaid diagram definition
 * @param {"svg" | "png" | "pdf"} outputFormat - Mermaid output format.
 * @param {ParseMDDOptions} [opt] - Options, see {@link ParseMDDOptions} for details.
 * @returns {Promise<Buffer>} The output file in bytes.
 */
// eslint-disable-next-line sonarjs/cognitive-complexity
async function parseMMD(
    browser: Browser,
    definition: string,
    outputFormat: string,
    {
        viewport,
        backgroundColor = "white",
        mermaidConfig = {},
        myCSS,
        pdfFit,
    }: ParseMDDOptions = {}
) {
    const page = await browser.newPage();
    try {
        if (viewport) {
            await page.setViewport(viewport);
        }
        const mermaidHTMLPath = path.join(
            __dirname,
            "..",
            "..",
            "files",
            "index.html"
        );
        await page.goto(url.pathToFileURL(mermaidHTMLPath).toString());
        await page.$eval(
            "body",
            (body, backgroundColor) => {
                body.style.background = backgroundColor;
            },
            backgroundColor
        );
        await page.$eval(
            "#container",
            (container, definition, mermaidConfig, myCSS, backgroundColor) => {
                container.textContent = definition;
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
                const mermaid: Mermaid = (window as any).mermaid as Mermaid;
                mermaid.initialize(mermaidConfig);
                // should throw an error if mmd diagram is invalid
                try {
                    mermaid.initThrowsErrors(
                        undefined,
                        container as HTMLElement
                    );
                } catch (error) {
                    // eslint-disable-next-line unicorn/prefer-ternary
                    if (error instanceof Error) {
                        // mermaid-js doesn't currently throws JS Errors, but let's leave this
                        // here in case it does in the future
                        throw error;
                    } else {
                        throw new TypeError(
                            (error as Error)?.message ??
                                "Unknown mermaid render error"
                        );
                    }
                }

                const svg = container.getElementsByTagName?.("svg")?.[0];
                if (svg?.style) {
                    svg.style.backgroundColor = backgroundColor;
                } else {
                    console.warn(
                        "svg not found. Not applying background color."
                    );
                    return;
                }
                if (myCSS) {
                    // add CSS as a <svg>...<style>... element
                    // see https://developer.mozilla.org/en-US/docs/Web/API/SVGStyleElement
                    const style = document.createElementNS(
                        "http://www.w3.org/2000/svg",
                        "style"
                    );
                    style.append(document.createTextNode(myCSS));
                    svg.append(style);
                }
            },
            definition,
            mermaidConfig,
            myCSS,
            backgroundColor
        );

        if (outputFormat === "svg") {
            const svgXML = await page.$eval("svg", (svg) => {
                // SVG might have HTML <foreignObject> that are not valid XML
                // E.g. <br> must be replaced with <br/>
                // Luckily the DOM Web API has the XMLSerializer for this
                // eslint-disable-next-line no-undef
                const xmlSerializer = new XMLSerializer();
                return xmlSerializer.serializeToString(svg);
            });
            return Buffer.from(svgXML, "utf8");
        } else if (outputFormat === "png") {
            const clip = await page.$eval("svg", (svg) => {
                const react = svg.getBoundingClientRect();
                return {
                    x: Math.floor(react.left),
                    y: Math.floor(react.top),
                    width: Math.ceil(react.width),
                    height: Math.ceil(react.height),
                };
            });
            await page.setViewport({
                ...viewport,
                width: clip.x + clip.width,
                height: clip.y + clip.height,
            });
            return await page.screenshot({
                clip,
                omitBackground: backgroundColor === "transparent",
            });
        } else {
            // pdf
            if (pdfFit) {
                const clip = await page.$eval("svg", (svg) => {
                    const react = svg.getBoundingClientRect();
                    return {
                        x: react.left,
                        y: react.top,
                        width: react.width,
                        height: react.height,
                    };
                });
                return await page.pdf({
                    omitBackground: backgroundColor === "transparent",
                    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
                    width: Math.ceil(clip.width) + clip.x * 2 + "px",
                    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
                    height: Math.ceil(clip.height) + clip.y * 2 + "px",
                    pageRanges: "1-1",
                });
            } else {
                return await page.pdf({
                    omitBackground: backgroundColor === "transparent",
                });
            }
        }
    } finally {
        await page.close();
    }
}
