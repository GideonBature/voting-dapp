class PollStorage {
    polls;

    constructor() {
        this.polls = new Map();
    }

    getAll() {
        return Array.from(this.polls.values());
    }

    addOne(poll) {
        this.polls.set(poll.id, poll);
    }

    getOneById(id) {
        return this.polls.get(id);
    }

    updateOne(poll) {
        this.polls.set(poll.id, poll);
    }
}

export const pollStorage = new PollStorage();
