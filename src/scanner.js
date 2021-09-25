/*
    扫描器类
 */
export default class Scanner {
    constructor(templateStr) {
        console.log(templateStr)
        this.templateStr = templateStr;
        // 指针
        this.pos = 0;
        // 尾巴
        this.tail = templateStr;
    }

    // 标记指定的内容，然后跳过
    scan(tag) {
        if (this.tail.indexOf(tag) === 0) {
            this.pos += tag.length;
            this.tail = this.templateStr.substring(this.pos);
        }
    }

    // 指针扫描，到指定内容结束，返回路径上的的字符
    scanUtil(stopTap) {
        const posBackup = this.pos;
        while (!this.eos() && this.tail.indexOf(stopTap) !== 0) {
            this.pos++;
            this.tail = this.templateStr.substr(this.pos);
        }
        return this.templateStr.substring(posBackup, this.pos);
    }

    // 指针是否到达最后
    eos() {
        return this.pos >= this.templateStr.length
    }

}
