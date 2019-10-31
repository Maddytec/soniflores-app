export class Message {
    message: {};
    classCss: {};

    constructor() {
    }

    public showMessage(message: { type: string, text: string }): void {
        this.message = message;
        this.buildClasses(message.type);
        setTimeout(() => {
            this.message = undefined;
        }, 5000);
    }

    private buildClasses(type: string): void {
        this.classCss = {
            'alert': true
        }

        if (type === 'error' || type === 'erro' || type === 'errors') {
            type = 'danger'
        }

        this.classCss['alert-' + type] = true;
    }
}