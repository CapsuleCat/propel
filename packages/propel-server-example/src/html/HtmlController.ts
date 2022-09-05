import { Controller, RequestMapping } from "@capsule-cat/propel-server";

@Controller("/")
export class HtmlController {
    @RequestMapping("/", RequestMapping.GET, {
        contentType: "text/html",
    })
    async get() {
        return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <h1>Hello World!</h1>
</body>
</html>
        `;
    }
}
