import { Poll } from '../model/poll';
import { pollStorage } from '../database/poll';
import { RollupStateHandler } from '../shared/rollup-state-handler';

export class PollController {
    /**
     * ### PollController createPoll
     * @description create a new poll.
     * @param {*} data {creator: string, question: string, options: string[]}
     */
    async createPoll(data) {
        return await RollupStateHandler.advanceWrapper(() => {
            const { creator, question, options } = data;
            const poll = new Poll({ creator, question, options });
            pollStorage.addOne(poll);

            return {
                ok: true,
                message: 'Poll created successfully!',
                data: poll.getData(),
            };
        });
    }

    /**
     * ### PollController castVote
     * @description cast a vote on a given poll.
     * @param {*} data {pollId: UUID, voterId: string, option: string}
     */
    async castVote(data) {
        return await RollupStateHandler.advanceWrapper(() => {
            const { pollId, voterId, option } = data;
            const poll = pollStorage.getOneById(pollId);

            if (!poll) {
                return {
                    status: 'reject',
                    error: 'Poll not found.',
                };
            }

            try {
                poll.addVote(voterId, option);
                pollStorage.updateOne(poll);

                return {
                    status: 'accept',
                    data: poll.getData(),
                };
            } catch (error) {
                return {
                    status: 'reject',
                    error: error.message,
                };
            }
        });
    }

    /**
     * ### PollController getPollResults
     * @description get results of a given poll.
     * @param {*} data {pollId: UUID}
     */
    async getPollResults(data) {
        return await RollupStateHandler.inspectWrapper(() => {
            const { pollId } = data;
            const poll = pollStorage.getOneById(pollId);

            if (!poll) {
                return {
                    status: 'reject',
                    error: 'Poll not found.',
                };
            }

            return {
                status: 'accept',
                data: poll.getData(),
            };
        });
    }
}

// Export an instance of the controller
export const pollController = new PollController();

