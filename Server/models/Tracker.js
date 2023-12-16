exports.getTracker = function() {
    return (Tracker);
}

class Tracker {
    constructor(searchHistory = []) {
        this.searchHistory = searchHistory; 
    }
}