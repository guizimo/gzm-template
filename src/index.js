import Scanner from "./scanner";

window.gzm_templateEngine = {
    render(templateStr, data) {
        console.log('render被调用，执行扫描器scanner')

        // s扫描模版字符串
        const scanner = new Scanner(templateStr);
        let word;
        while (!scanner.eos()) {
            word = scanner.scanUtil('{{');
            console.log(word);
            scanner.scan("{{")
            word = scanner.scanUtil('}}');
            console.log(word);
            scanner.scan("}}")
        }
    }
}
