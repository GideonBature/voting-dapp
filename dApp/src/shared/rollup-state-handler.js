export class RollupStateHandler {
    static async handleReport(data) {
        return {
            status: 'accept',
            data
        };
    }
}
