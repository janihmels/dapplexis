"use strict";

var UserInfo = function(obj) {
    if (obj) {
        this.id = obj.id;
        this.projects = obj.projects;
        this.languages = obj.languages;
        this.props = obj.props;
    } else {
        this.id = -1;
        this.languages = [];
        this.projects = [];
        this.props = {};
    }
}
UserInfo.prototype = {
    toString: function () {
		return JSON.stringify(this);
    }
}

var TranslationProject = function(obj) {
    if (obj) {
        this.id = obj.id;           // the project id
        this.userid = obj.userid;   // The user who created the project
        this.whoami = obj.whoami;   // The currenty logged in user
        this.stringIds = obj.stringIds; // arrray with project string ids
        this.sourceLanguage = obj.sourceLanguage; // source language
        this.targetLanguage = obj.targetLanguage; // target language
        this.props = obj.props;                   // json properties  
    } else {
        this.id = "";
        this.userid = -1;
        this.whoami = -1;
        this.stringIds = [];
        this.sourceLanguage = "";
        this.targetLanguage = "";
        this.props = {};
    }
}

TranslationProject.prototype = {
    toString: function () {
		return JSON.stringify(this);
    }
}

var StringObj = function(obj) {
    if (obj) {
        this.id = obj.id;
        this.text = obj.text;
        this.language = obj.language;
        this.translations = obj.translations;
        this.props = obj.props;
    } else {
        this.id = "";
        this.text = "";
        this.language = "";
        this.translations = {};
        this.props = {};
    }
}

StringObj.prototype = {
	toString: function () {
		return JSON.stringify(this);
	}
};

var TranslationContract = function() {
    LocalContractStorage.defineProperty(this, "totalUsers");
    LocalContractStorage.defineProperty(this, "totalTranslationStrings");
    LocalContractStorage.defineProperty(this, "totalProjects");
	LocalContractStorage.defineMapProperties(this, {
		"users" : {
        },
        "fromToId": {
        },
        "idToString" : {
        },
        "stringToId" : {
        },
        "idToProject": {
        },
        "stringTranslations": {
        }
	});
};

TranslationContract.prototype = {
    init: function () {
        this.admin = Blockchain.transaction.from;
        this.totalTranslationStrings = 0;
        this.totalProjects = 0;
        this.totalUsers = 0;
    },

    _isOwner: function() {
        var from = Blockchain.transaction.from;
        if (from === this.admin) {
            return true
        }
        throw new Error("You need admin permissions to perform this action.");
    },

    register: function (languages, props) {
        var from = Blockchain.transaction.from;
        var id = this.fromToId.get(from);
        if (id == null) {
            id = this.totalUsers;
            this.fromToId.put(from, id);
            this.totalUsers += 1;
        }
        var userInfo = new UserInfo();
        userInfo.id = id;
        userInfo.props = props;
        userInfo.languages = languages;
        this.users.put(id, userInfo);
    },

    unregister: function (languages, props) {
        var from = Blockchain.transaction.from;
        var id = this.fromToId.get(from);
        if (id == null) {
            throw new Error("The user does not exist"); 
        }
        this.users.del(id);
    },

    getUser: function() {
        var from = Blockchain.transaction.from;
        var id = this.fromToId.get(from);
        if (id == null) {
            throw new Error("The user does not exist"); 
        }
        var user = this.users.get(id);
        var projects = user.projects;
        for (var i=0; i<projects.length; ++i) {
            var project = projects[i];
            var translationsArr = [];
            for (var j=0; j<project.stringIds.length; ++j) {
                var stringObj = this.idToString.get(project.stringIds[j]);
                var translations = stringObj.translations;
                translationsArr.push(translations);
            }
            project.translationsArr = translationsArr;
        }
        return (user);
        
    },

    getProject: function(projectId) {
        return this.getProjects([projectId])[0];
    },

    getProjects: function(projectIds) {
        var from = Blockchain.transaction.from;
        var id = this.fromToId.get(from);
        if (id == null) {
            throw new Error("The user does not exist"); 
        }
        var projects = [];
        for (var i = 0; i < projectIds.length; i++) {
            var project = this.idToProject.get(projectIds[i]);
            project.stringObjs = this._getTranslationStrings(project.stringIds, project.targetLanguage);
            project.whoami = id;
            projects.push(project);
        }
        return projects;
    },

    getProjectsForUser: function() {
        var from = Blockchain.transaction.from;
        var id = this.fromToId.get(from);
        if (id == null) {
            throw new Error("The user does not exist"); 
        }
        var user = this.users.get(id);
        var projectsForUser = [];
        for (var i=0; i<this.totalProjects; ++i) {
            var project = this.getProject(i);
            // if the project source and target language are within the user languages
            if (user.languages.indexOf(project.sourceLanguage) > -1 && 
                user.languages.indexOf(project.targetLanguage) > -1) {

                    // Add translations to project
                    var translationsArr = [];
                    for (var j=0; j<project.stringIds.length; ++j) {
                        var stringObj = this.idToString.get(project.stringIds[j]);
                        var translations = stringObj.translations;
                        translationsArr.push(translations);
                    }
                    project.translationsArr = translationsArr;
                    
                    projectsForUser.push(project);
                   
                    
                    
                    
                
                }           
        }
        return projectsForUser;
    },

    _getTranslationStrings: function(stringIds, targetLanguage) {
        var stringObjs = [];
        for (var i=0; i<stringIds.length; ++i) {
            var stringObj = this.idToString.get(stringIds[i]);
            var translations = stringObj.translations;
            var transStringObjs = {};
            for (var transStrId in translations) {
                // check if the property/key is defined in the object itself, not in parent
                if (translations.hasOwnProperty(transStrId)) {           
                    var transStrObj = this.idToString.get(transStrId);
                    var [posVotes, negVotes] = translations[transStrId];
                    if (transStrObj.language == targetLanguage) {
                        
                        transStringObjs[transStrObj.text] = [posVotes, negVotes];
                        
                        
                    }
                }
            }
            stringObj.transStringObjs = transStringObjs;
            stringObjs.push(stringObj);
        }
        return stringObjs;
    },

    // The input is 3 equally sized arrays: 
    // srcStringIds: an array of string ids in a source language (an id can repeat multiple times)
    // targetStringIds: an array of string ids in the target langauge (an id can repeat multiple times)
    // votes: the "vote" for a given source->target pair (currently +1 or -1). Will be added to the pair's score.
    _castVotes: function(userId, srcStringIds, targetStringIds, votes) {
        for (var i=0; i<srcStringIds.length; ++i) {
            var srcString = this.idToString.get(srcStringIds[i]);
            var posVotes = {};
            var negVotes = {};
            if (targetStringIds[i] in srcString.translations) {
                var [posVotes, negVotes] = srcString.translations[targetStringIds[i]];
            }
            if (userId in posVotes && votes[i] == -1) {
                delete posVotes[userId];
            } else if (userId in negVotes && votes[i] == 1) {
                delete negVotes[userId];
            } else if (!(userId in posVotes) && votes[i] == 1){
                posVotes[userId] = true;
            } else if (!(userId in negVotes) && votes[i] == -1){
                negVotes[userId] = true;
            }
            srcString.translations[targetStringIds[i]] = [posVotes, negVotes];
            this.idToString.put(srcStringIds[i], srcString);
        }
    },

    // Pass project id, src stirng id
    updateProjectStrings(projectId, srcStringIds, translationsStrings, votes) {
        var from = Blockchain.transaction.from;
        var userId = this.fromToId.get(from);
        if (userId == null) {
            throw new Error("The user does not exist"); 
        }
        var project = this.getProject(projectId);
        var transStringsIds = this._addStrings(project.targetLanguage, translationsStrings);
        this._castVotes(userId, srcStringIds, transStringsIds, votes);
    },

    // Internal
    _addStrings: function(language, translationStrings) {
        var stringIds = []
        for (var i = 0; i < translationStrings.length; i++) {
            var transId = this.stringToId.get([language, translationStrings[i]]);
            if (transId == null) {
                transId = this.totalTranslationStrings;
                this.stringToId.put([language, translationStrings[i]], parseInt(transId));
                var stringInfo = new StringObj();
                stringInfo.id = transId;
                stringInfo.text = translationStrings[i];
                stringInfo.language = language;
                this.idToString.put(transId, stringInfo);
                this.totalTranslationStrings += 1;
            } 
            stringIds.push(transId);
        }
        return stringIds;    
    },

    addTranslationProject: function (sourceLanguage, targetLanguage, transStrs, props) {
        var from = Blockchain.transaction.from;
        var userId = this.fromToId.get(from);
        if (userId == null) {
            throw new Error("The user does not exist"); 
        }
        var projectId = this.totalProjects;
        var stringIds = this._addStrings(sourceLanguage, transStrs);
        var project = new TranslationProject();
        project.id = projectId;
        project.userid = userId;
        project.stringIds = stringIds;
        project.sourceLanguage = sourceLanguage;
        project.targetLanguage = targetLanguage;
        project.props = props;
        this.idToProject.put(projectId, project);
        this.totalProjects += 1;
        var user = this.users.get(userId);
        user.projects.push(project);
        this.users.put(userId, user);
    }
};
module.exports = TranslationContract;