export class GAPI {
    public static async getInstance() {
        console.log(this.gapi);
        if (this.gapi) {
            return this.gapi
        }
        await this.getGAPI();
        return this.gapi;
    }
    public static setConfig(config: any) {
        this.config = config;
    }
    private static gapi;
    private static config;
    private static getGAPI() {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "https://apis.google.com/js/api.js";

        return new Promise((resolve) => {
            script.onload = async (e) => {
                // @ts-ignore
                gapi.load('client', async() => {
                    // @ts-ignore
                    await gapi.client.init(this.config);
                    // @ts-ignore
                    this.gapi = gapi;
                    // @ts-ignore
                    resolve()
                })

            }
            document.getElementsByTagName('head')[0].appendChild(script);
        })

    }
}