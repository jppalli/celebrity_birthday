define(function() {

    var _onTextureAdded = null;
    var _onTextureRemoved = null;
    var _onDetailedTextureAdded = null;
    var _onDetailedTextureRemoved = null;
    var _missingHashes = {
        trackingStartTime: 0,
        hashes: {}
    };

        var _interestingHashes = {
        hashes: [],
        add: function(hashesToAdd) {
            var item;
            for (var i = 0; i < hashesToAdd.length; i++) {
                item = hashesToAdd[i];
                if (this.hashes.indexOf(item) == -1) {
                    this.hashes.push(item);
                    console.log("added hash", item);
                }
            }

            overwolfInternal.game.setHashesOfInterest({"hash_details_list": this.hashes});
        },
        remove: function(hashesToRemove) {
            var item;
            for (var i = 0; i < hashesToRemove.length; i++) {
                item = hashesToRemove[i];
                var curRemoveIndex = this.hashes.indexOf(item);
                if (curRemoveIndex == -1) {
                    console.log("Requested to remove hash", item, 'which is not in array');
                    continue;
                }
                this.hashes.splice(curRemoveIndex, 1);
                console.log("Removed hash", item);
            }

            overwolfInternal.game.setHashesOfInterest({"hash_details_list": this.hashes});
        }
    };


    var onEvent = {
        allListeners: [],
        addEventListener: function (listener) {
            this.allListeners.push(listener);
        },
        removeEventListener: function (listener) {
            var index = _.indexOf(this.allListeners, listener);
            if (index > 0) {
                this.allListeners.splice(index, 1);
            }
        },
        fireEvent: function(evtInfo){
            for( var i=0;i<this.allListeners.length;i++){
                this.allListeners[i](evtInfo);
            }
        }
    };

    function start(onTextureAdded, onTextureRemoved, onDetailedTextureAdded, onDetailedTextureRemoved) {

        _onTextureAdded = onTextureAdded;
        _onTextureRemoved = onTextureRemoved;
        _onDetailedTextureAdded = onDetailedTextureAdded;
        _onDetailedTextureRemoved = onDetailedTextureRemoved;

        overwolfInternal.game.onHashesAppeared.addListener(_onTextureAdded);
        overwolfInternal.game.onHashesDisappeared.addListener(_onTextureRemoved);
        overwolfInternal.game.onDetailedHashesAppeared.addListener(_onDetailedTextureAdded);
        overwolfInternal.game.onDetailedHashesDisappeared.addListener(_onDetailedTextureRemoved);

        console.log("Hashes Listener started");

        _missingHashes.trackingStartTime = Date.now();
    }

    function stop() {
        overwolfInternal.game.onHashesAppeared.removeListener(_onTextureAdded);
        overwolfInternal.game.onHashesDisappeared.removeListener(_onTextureRemoved);
        overwolfInternal.game.onDetailedHashesAppeared.removeListener(_onDetailedTextureAdded);
        overwolfInternal.game.onDetailedHashesDisappeared.removeListener(_onDetailedTextureRemoved);
        reportMissingHashes();
        overwolfInternal.game.setHashesOfInterest({"hash_details_list": []}); 
    }

    function addHashes(hashes) {
        _interestingHashes.add(hashes);
    }

    function removeHashes(hashes) {
        _interestingHashes.remove(hashes);
    }

    function trackHashes(ids) {
        var id;
        for (var i = 0; i < ids.length; i++) {
            id = ids[i];
            if (!_missingHashes.hashes[id]) {
                _missingHashes.hashes[id] = true;
            }
        }
    }

    function setHashFound(id) {
        _missingHashes.hashes[id] = false;
    }

    function reportMissingHashes() {
        var minLengthMinutes = (localStorage['minLengthMinutes'] ? parseInt(localStorage['minLengthMinutes']) : 5);
        var sessionLength = Date.now() - _missingHashes.trackingStartTime;

        if (sessionLength <= 1000 * 60 * minLengthMinutes) {
            return false;
        }

        var sent = false;
        for (var key in _missingHashes.hashes) {
            if (_missingHashes.hashes[key]) {
                var postData = {
                    Kind: 20000,
                    Extra: key
                };
                sent = true;
                (function (postData) {
                    OWGEP.sendTrack(postData.Kind, postData.Extra);
                })(postData);
            }
        }

        return sent;

    }



    return {
        start: start,
        stop: stop,
        addHashes: addHashes,
        removeHashes: removeHashes,
        trackHashes: trackHashes,
        setHashFound: setHashFound,
        onEvent: onEvent
    };



});
