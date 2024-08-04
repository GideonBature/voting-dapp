import { ROLLUP_SERVER } from './config';
import { toHex } from 'viem';

export class RollupStateHandler {
    /**
     * ### RollupStateHandler advanceWrapper
     * @description Wraps advance state handling logic.
     * @param {Function} callback - Controller action to be executed.
     * @returns {Promise<{status: string, data?: any, error?: string}>}
     */
    static async advanceWrapper(callback) {
        try {
            const result = await callback();
            const bodyFallback = result?.data ?? undefined;
            const noticeResponse = await fetch(`${ROLLUP_SERVER}/notice`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    payload: toHex(JSON.stringify(bodyFallback)),
                }),
            });
            const noticeResponseText = await noticeResponse.text();

            if (noticeResponse.status >= 400) {
                throw new Error(noticeResponseText);
            }

            console.info(`Notice generated with status: ${noticeResponse.status}.`);
            console.info(`Notice response: ${noticeResponseText}`);
            console.info(`Notice data: ${JSON.stringify(bodyFallback)}`);

            return {
                status: 'accept',
                data: bodyFallback
            };
        } catch (err) {
            return this.handleReport(err.message || 'Unknown error');
        }
    }

    /**
     * ### RollupStateHandler inspectWrapper
     * @description Wraps inspect state handling logic.
     * @param {Function} callback - Controller action to be executed.
     * @returns {Promise<{status: string, data?: any, error?: string}>}
     */
    static async inspectWrapper(callback) {
        try {
            const result = await callback();
            const dataFallback = result?.data ?? undefined;

            return {
                status: 'accept',
                data: dataFallback
            };
        } catch (err) {
            return this.handleReport(err.message || 'Unknown error');
        }
    }

    /**
     * ### RollupStateHandler handleReport
     * @description Encapsulates and reuses report sending logic.
     * @param {*} data - Data to be reported.
     * @param {string} [status='reject'] - Report status, default: 'reject'.
     * @param {string} [rollupServer=ROLLUP_SERVER] - Rollup server URL.
     * @returns {Promise<{status: string}>}
     */
    static async handleReport(data, status = 'reject', rollupServer = ROLLUP_SERVER) {
        const reportResponse = await fetch(`${rollupServer}/report`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                payload: toHex(JSON.stringify(data)),
            }),
        });
        const reportResponseText = await reportResponse.text();

        if (reportResponse.status >= 400 && status === 'accept') {
            status = 'reject';
        }

        console.info(`Report generated with status: ${reportResponse.status}.`);
        console.info(`Report response: ${reportResponseText}`);
        console.info(`Report data: ${JSON.stringify(data)}`);

        return { status };
    }
}