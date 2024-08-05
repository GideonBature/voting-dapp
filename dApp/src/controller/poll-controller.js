import { Poll } from '../model/poll';
import { pollStorage } from '../database/poll';
import { RollupStateHandler } from '../shared/rollup-state-handler';

class PollController {
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
    // async getPollById(data) {
    //     return await RollupStateHandler.inspectWrapper(() => {
    //         const { pollId } = data;
    //         const poll = pollStorage.getOneById(pollId);

    //         if (!poll) {
    //             return {
    //                 status: 'reject',
    //                 error: 'Poll not found.',
    //             };
    //         }

    //         return {
    //             status: 'accept',
    //             data: poll.getData(),
    //         };
    //     });
    // }

    async getPollById(data) {
        const pollId = data[0];
        const pollRequest = shelfStorage.getOneById(pollId);

        if (!pollRequest?.id)
            return await RollupStateHandler.handleReport({
                error: `Poll not found for id '${pollId}'.`,
            });

        return await RollupStateHandler.inspectWrapper(() => ({
            status: 'accept',
            data: pollRequest.getData(),

        }));
    }

    async getAllPolls() {
        return await RollupStateHandler.inspectWrapper(() => {
            pollStorage.getAll();
        });
    }
}

// Export an instance of the controller
export const pollController = new PollController();

