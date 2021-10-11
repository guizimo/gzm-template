import {parseTemplateToTokens, renderTemplate} from "./utils/utils";

window.gzm_templateEngine = {
    render(templateStr, data) {
        let tokens = parseTemplateToTokens(templateStr)
        return renderTemplate(tokens, data)
    }
}
