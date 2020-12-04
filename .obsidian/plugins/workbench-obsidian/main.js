'use strict';

var obsidian = require('obsidian');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var WorkbenchPlugin = /** @class */ (function (_super) {
    __extends(WorkbenchPlugin, _super);
    function WorkbenchPlugin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WorkbenchPlugin.prototype.onload = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log('Loading the Workbench plugin.');
                        //load data from saved settings
                        _a = this;
                        return [4 /*yield*/, this.loadData()];
                    case 1:
                        //load data from saved settings
                        _a.settings = (_b.sent()) || new WorkbenchSettings();
                        this.addRibbonIcon('pencil', 'Workbench', function () {
                            var obsidianApp = _this.app;
                            var workbenchNoteTitle = _this.settings.workbenchNoteName;
                            var files = obsidianApp.vault.getFiles();
                            var workbenchNoteFile = files.filter(function (e) { return e.name === workbenchNoteTitle //hat-tip 🎩 to @MrJackPhil for this little workflow 
                                || e.path === workbenchNoteTitle
                                || e.basename === workbenchNoteTitle; })[0];
                            obsidianApp.workspace.openLinkText(workbenchNoteTitle, workbenchNoteFile.path, true, obsidian.MarkdownPreviewView);
                        });
                        this.addCommand({
                            id: 'workbench-link-current-note',
                            name: 'Link the current note/page in your Workbench.',
                            // callback: () => {
                            // 	console.log('Simple Callback');
                            // },
                            checkCallback: function (checking) {
                                var leaf = _this.app.workspace.activeLeaf;
                                if (leaf) {
                                    if (!checking) {
                                        _this.linkNoteInWorkbench();
                                    }
                                    return true;
                                }
                                return false;
                            }
                        });
                        this.addCommand({
                            id: 'workbench-embed-current-note',
                            name: 'Embed the current note/page in your Workbench.',
                            // callback: () => {
                            // 	console.log('Simple Callback');
                            // },
                            checkCallback: function (checking) {
                                var leaf = _this.app.workspace.activeLeaf;
                                if (leaf) {
                                    if (!checking) {
                                        _this.embedNoteInWorkbench();
                                    }
                                    return true;
                                }
                                return false;
                            }
                        });
                        this.addCommand({
                            id: 'workbench-link-current-block',
                            name: 'Link the current line/block in your Workbench.',
                            // callback: () => {
                            // 	console.log('Simple Callback');
                            // },
                            checkCallback: function (checking) {
                                var leaf = _this.app.workspace.activeLeaf;
                                if (leaf) {
                                    if (!checking) {
                                        _this.linkBlockInWorkbench();
                                    }
                                    return true;
                                }
                                return false;
                            }
                        });
                        this.addCommand({
                            id: 'workbench-embed-current-block',
                            name: 'Embed the current line/block into your Workbench.',
                            // callback: () => {
                            // 	console.log('Simple Callback');
                            // },
                            checkCallback: function (checking) {
                                var leaf = _this.app.workspace.activeLeaf;
                                if (leaf) {
                                    if (!checking) {
                                        _this.embedBlockInWorkbench();
                                    }
                                    return true;
                                }
                                return false;
                            }
                        });
                        this.addCommand({
                            id: 'workbench-copy-current-block',
                            name: 'Copy the current line/block into your Workbench.',
                            // callback: () => {
                            // 	console.log('Simple Callback');
                            // },
                            checkCallback: function (checking) {
                                var leaf = _this.app.workspace.activeLeaf;
                                if (leaf) {
                                    if (!checking) {
                                        _this.copyBlockIntoWorkbench();
                                    }
                                    return true;
                                }
                                return false;
                            }
                        });
                        this.addCommand({
                            id: 'workbench-copy-and-link-current-block',
                            name: 'Copy the current line its block-link into your Workbench.',
                            // callback: () => {
                            // 	console.log('Simple Callback');
                            // },
                            checkCallback: function (checking) {
                                var leaf = _this.app.workspace.activeLeaf;
                                if (leaf) {
                                    if (!checking) {
                                        _this.copyLineAndLinkToBlock();
                                    }
                                    return true;
                                }
                                return false;
                            }
                        });
                        this.addCommand({
                            id: 'workbench-link-current-section',
                            name: 'Link the current heading/section into your Workbench.',
                            // callback: () => {
                            // 	console.log('Simple Callback');
                            // },
                            checkCallback: function (checking) {
                                var leaf = _this.app.workspace.activeLeaf;
                                if (leaf) {
                                    if (!checking) {
                                        _this.linkSectionInWorkbench();
                                    }
                                    return true;
                                }
                                return false;
                            }
                        });
                        this.addCommand({
                            id: 'workbench-embed-current-section',
                            name: 'Embed the current heading/section into your Workbench.',
                            // callback: () => {
                            // 	console.log('Simple Callback');
                            // },
                            checkCallback: function (checking) {
                                var leaf = _this.app.workspace.activeLeaf;
                                if (leaf) {
                                    if (!checking) {
                                        _this.embedSectionInWorkbench();
                                    }
                                    return true;
                                }
                                return false;
                            }
                        });
                        this.addCommand({
                            id: 'clear-workbench',
                            name: 'Clear the workbench note.',
                            // callback: () => {
                            // 	console.log('Simple Callback');
                            // },
                            callback: function () {
                                _this.clearWorkbench();
                            }
                        });
                        this.addCommand({
                            id: 'insert-workbench',
                            name: 'Insert the contents of the workbench note.',
                            // callback: () => {
                            // 	console.log('Simple Callback');
                            // },
                            checkCallback: function (checking) {
                                var leaf = _this.app.workspace.activeLeaf;
                                if (leaf) {
                                    if (!checking) {
                                        _this.insertWorkbench();
                                    }
                                    return true;
                                }
                                return false;
                            }
                        });
                        this.addSettingTab(new WorkbenchSettingTab(this.app, this));
                        /*this.registerEvent(this.app.on('codemirror', (cm: CodeMirror.Editor) => {
                            console.log('codemirror', cm);
                        })); */
                        this.registerDomEvent(document, 'click', function (evt) {
                            if (_this.settings.altClickType != "Nothing") {
                                if (evt.altKey) {
                                    if ((evt.target.className === "internal-link") || (evt.target.className.includes("cm-hmd-internal-link"))) {
                                        console.log("alt");
                                        _this.altClick(evt);
                                    }
                                }
                            }
                            if (_this.settings.metaAltClickType != "Nothing") {
                                if (evt.metaKey && evt.altKey) {
                                    if ((evt.target.className.includes("cm-hmd-internal-link"))) {
                                        new obsidian.Notice("Sorry, this doesn't work when you click directly on a link. Try clicking outside of the link!");
                                    }
                                    else if ((evt.target.className.includes("CodeMirror-line")) || evt.target.className.includes("cm")) {
                                        var currentFile = _this.app.workspace.activeLeaf.view.file;
                                        console.log("meta+alt");
                                        _this.metaAltClick(evt, currentFile);
                                    }
                                }
                            }
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    WorkbenchPlugin.prototype.onunload = function () {
        console.log('Unloading the Workbench plugin.');
    };
    WorkbenchPlugin.prototype.insertWorkbench = function () {
        var obsidianApp = this.app;
        var workbenchNoteTitle = this.settings.workbenchNoteName;
        var files = obsidianApp.vault.getFiles();
        var workbenchNoteFile = files.filter(function (e) { return e.name === workbenchNoteTitle //hat-tip 🎩 to @MrJackPhil for this little workflow 
            || e.path === workbenchNoteTitle
            || e.basename === workbenchNoteTitle; })[0];
        var currentNoteFile = obsidianApp.workspace.activeLeaf.view.file;
        var editor = obsidianApp.workspace.activeLeaf.view.sourceMode.cmEditor;
        var cursor = editor.getCursor();
        console.log(cursor);
        var doc = editor.getDoc();
        obsidianApp.vault.read(workbenchNoteFile).then(function (result) {
            doc.replaceRange(result, cursor);
            editor.focus();
        });
    };
    WorkbenchPlugin.prototype.clearWorkbench = function () {
        var obsidianApp = this.app;
        var workbenchNoteTitle = this.settings.workbenchNoteName;
        var editor = obsidianApp.workspace.activeLeaf.view.sourceMode.cmEditor;
        var cursor = editor.getCursor();
        var files = obsidianApp.vault.getFiles();
        var workbenchNoteFile = files.filter(function (e) { return e.name === workbenchNoteTitle //hat-tip 🎩 to @MrJackPhil for this little workflow 
            || e.path === workbenchNoteTitle
            || e.basename === workbenchNoteTitle; })[0];
        obsidianApp.vault.modify(workbenchNoteFile, "");
        editor.setCursor(cursor);
        editor.focus();
    };
    WorkbenchPlugin.prototype.saveToWorkbench = function (theMaterial, saveAction) {
        var obsidianApp = this.app;
        var editor = obsidianApp.workspace.activeLeaf.view.sourceMode.cmEditor;
        var cursor = editor.getCursor();
        var blankLine = this.settings.includeBlankLine;
        var linePrefix = this.settings.workbenchLinePrefix;
        console.log(linePrefix + theMaterial);
        var workbenchNoteTitle = this.settings.workbenchNoteName;
        var files = obsidianApp.vault.getFiles();
        var workbenchNoteFile = files.filter(function (e) { return e.name === workbenchNoteTitle //hat-tip 🎩 to @MrJackPhil for this little workflow 
            || e.path === workbenchNoteTitle
            || e.basename === workbenchNoteTitle; })[0];
        console.log("Workbench note:" + workbenchNoteFile);
        if (!workbenchNoteFile) {
            console.log("The workbench note does not already exist. Creating it, then appending the new content to it.");
            var noteText = linePrefix + theMaterial;
            var newWorkbenchFile = obsidianApp.vault.create(workbenchNoteTitle + ".md", noteText);
        }
        else { // The file exists 
            console.log("The workbench note already exists. Appending the new content to it.");
            obsidianApp.vault.read(workbenchNoteFile).then(function (result) {
                var previousNoteText = result;
                //console.log("Previous note text:\n" + previousNoteText);
                var lineSpacing = "\n";
                if (blankLine) {
                    lineSpacing = "\n\n";
                }
                var newNoteText = previousNoteText + lineSpacing + linePrefix + theMaterial;
                obsidianApp.vault.modify(workbenchNoteFile, newNoteText);
                new obsidian.Notice("Added " + saveAction + " to the workbench.");
            });
        }
        editor.setCursor(cursor);
        editor.focus();
    };
    WorkbenchPlugin.prototype.createBlockHash = function (inputText) {
        var obsidianApp = this.app;
        var result = '';
        var characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < 7; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    };
    WorkbenchPlugin.prototype.getBlock = function (inputLine, noteFile) {
        var obsidianApp = this.app;
        var noteBlocks = obsidianApp.metadataCache.getFileCache(noteFile).blocks;
        console.log("Checking if line '" + inputLine + "' is a block.");
        var blockString = "";
        if (noteBlocks) { // the file does contain blocks. If not, return ""
            for (var eachBlock in noteBlocks) { // iterate through the blocks. 
                console.log("Checking block ^" + eachBlock);
                var blockRegExp = new RegExp("(" + eachBlock + ")$", "gim");
                if (inputLine.match(blockRegExp)) { // if end of inputLine matches block, return it
                    blockString = eachBlock;
                    console.log("Found block ^" + blockString);
                    return blockString;
                }
            }
            return blockString;
        }
        return blockString;
    };
    WorkbenchPlugin.prototype.altClick = function (someMouseEvent) {
        var obsidianApp = this.app;
        var clickType = this.settings.altClickType;
        var linkPrefix = "";
        if (clickType === "Embed") {
            linkPrefix = "!";
        }
        var newMaterial = linkPrefix + "[[" + someMouseEvent.target.innerText + "]]";
        this.saveToWorkbench(newMaterial, "a link to the selected note");
    };
    WorkbenchPlugin.prototype.metaAltClick = function (someMouseEvent, activeFile) {
        console.log("Meta alt click");
        var obsidianApp = this.app;
        var lineText = someMouseEvent.target.innerText;
        if ((someMouseEvent.target.className.includes("cm"))) {
            lineText = someMouseEvent.target.parentNode.innerText;
        }
        console.log("The contents of the line are: " + lineText);
        // Get the file and create a link to it
        var currentNoteFile = activeFile;
        var noteLink = obsidianApp.metadataCache.fileToLinktext(currentNoteFile, currentNoteFile.path, true);
        var clickType = this.settings.metaAltClickType;
        if (lineText != "") {
            if (clickType === "Copy") {
                var newMaterial = lineText;
                this.saveToWorkbench(newMaterial, "a copy of the selected line/block");
            }
            else {
                var linkPrefix = "";
                if (clickType === "Embed") {
                    linkPrefix = "!";
                }
                console.log("Checking for block:");
                if (this.getBlock(lineText, currentNoteFile) === "") { // The line is not already a block
                    lineText = lineText.trim();
                    console.log("This line is not currently a block. Adding a block ID.");
                    lineBlockID = this.createBlockHash(lineText).toString();
                    var lineWithBlock_1 = lineText + " ^" + lineBlockID;
                    obsidianApp.vault.read(currentNoteFile).then(function (result) {
                        var previousNoteText = result;
                        var newNoteText = previousNoteText.replace(lineText, lineWithBlock_1);
                        obsidianApp.vault.modify(currentNoteFile, newNoteText);
                    });
                }
                else {
                    var lineBlockID = this.getBlock(lineText, currentNoteFile);
                    console.log(lineBlockID);
                }
                var newMaterial = linkPrefix + "[[" + noteLink + "#^" + lineBlockID + "]]";
                console.log(newMaterial);
                this.saveToWorkbench(newMaterial, "a link to the selected line/block");
            }
        }
        else {
            new obsidian.Notice("There is nothing on the selected line.");
        }
    };
    WorkbenchPlugin.prototype.linkNoteInWorkbench = function () {
        var obsidianApp = this.app;
        var currentView = obsidianApp.workspace.activeLeaf.view;
        // Get the file and create a link to it
        var currentNoteFile = obsidianApp.workspace.activeLeaf.view.file;
        var noteLink = obsidianApp.metadataCache.fileToLinktext(currentNoteFile, currentNoteFile.path, true);
        var editor = currentView.sourceMode.cmEditor;
        var newMaterial = "[[" + noteLink + "]]";
        console.log(newMaterial);
        this.saveToWorkbench(newMaterial, "a link to the current note");
    };
    WorkbenchPlugin.prototype.embedNoteInWorkbench = function () {
        var obsidianApp = this.app;
        // Get the file and create a link to it
        var currentNoteFile = obsidianApp.workspace.activeLeaf.view.file;
        var noteLink = obsidianApp.metadataCache.fileToLinktext(currentNoteFile, currentNoteFile.path, true);
        var newMaterial = "![[" + noteLink + "]]";
        console.log(newMaterial);
        this.saveToWorkbench(newMaterial, "an embed of the current note");
    };
    WorkbenchPlugin.prototype.linkSectionInWorkbench = function () {
        var obsidianApp = this.app;
        // get the heading
        var currentView = obsidianApp.workspace.activeLeaf.view;
        var currentNoteFile = currentView.file;
        var editor = currentView.sourceMode.cmEditor;
        var cursor = editor.getCursor();
        var currentLine = editor.doc.sel.ranges[0].anchor.line;
        // Stuck here. For some reason the action only works once on some sections tktktk
        var headings = obsidianApp.metadataCache.getFileCache(currentNoteFile).headings;
        var sectionHeading;
        console.log(headings);
        if (!headings) {
            new obsidian.Notice("No headings found in the current document.");
            return;
        }
        else { // check what heading is closest above the current line
            for (var _i = 0, headings_1 = headings; _i < headings_1.length; _i++) {
                var eachHeading = headings_1[_i];
                var headingLineNumber = eachHeading.position.start.line;
                if (headingLineNumber == currentLine) {
                    sectionHeading = eachHeading;
                    break;
                }
                else if (headingLineNumber > currentLine) {
                    break;
                }
                sectionHeading = eachHeading;
            }
        }
        var noteLink = obsidianApp.metadataCache.fileToLinktext(currentNoteFile, currentNoteFile.path, true);
        var newMaterial = "[[" + noteLink + "#" + sectionHeading.heading + "]]";
        console.log(newMaterial);
        this.saveToWorkbench(newMaterial, "a link to the current section");
    };
    WorkbenchPlugin.prototype.embedSectionInWorkbench = function () {
        var obsidianApp = this.app;
        // get the heading
        var currentView = obsidianApp.workspace.activeLeaf.view;
        var currentNoteFile = currentView.file;
        var editor = currentView.sourceMode.cmEditor;
        var cursor = editor.getCursor();
        var currentLine = editor.doc.sel.ranges[0].anchor.line;
        // Stuck here. For some reason the action only works once on some sections tktktk
        var headings = obsidianApp.metadataCache.getFileCache(currentNoteFile).headings;
        var sectionHeading;
        console.log(headings);
        if (!headings) {
            new obsidian.Notice("No headings found in the current document.");
            return;
        }
        else { // check what heading is closest above the current line
            for (var _i = 0, headings_2 = headings; _i < headings_2.length; _i++) {
                var eachHeading = headings_2[_i];
                var headingLineNumber = eachHeading.position.start.line;
                if (headingLineNumber == currentLine) {
                    sectionHeading = eachHeading;
                    break;
                }
                else if (headingLineNumber > currentLine) {
                    break;
                }
                sectionHeading = eachHeading;
            }
        }
        var noteLink = obsidianApp.metadataCache.fileToLinktext(currentNoteFile, currentNoteFile.path, true);
        var newMaterial = "![[" + noteLink + "#" + sectionHeading.heading + "]]";
        console.log(newMaterial);
        this.saveToWorkbench(newMaterial, "a link to the current section");
    };
    WorkbenchPlugin.prototype.linkBlockInWorkbench = function () {
        var obsidianApp = this.app;
        // get the block
        var currentView = obsidianApp.workspace.activeLeaf.view;
        var currentNoteFile = currentView.file;
        var editor = currentView.sourceMode.cmEditor;
        var cursor = editor.getCursor();
        var lineText = editor.getLine(cursor.line);
        console.log(lineText);
        console.log("Checking for block:");
        var lineBlockID = this.getBlock(lineText, currentNoteFile);
        console.log(lineBlockID);
        if (this.getBlock(lineText, currentNoteFile) === "") { // The line is not already a block
            console.log("This line is not currently a block. Adding a block ID.");
            lineBlockID = this.createBlockHash(lineText).toString();
            var lineWithBlock_2 = lineText + " ^" + lineBlockID;
            obsidianApp.vault.read(currentNoteFile).then(function (result) {
                var previousNoteText = result;
                var newNoteText = previousNoteText.replace(lineText, lineWithBlock_2);
                obsidianApp.vault.modify(currentNoteFile, newNoteText);
            });
        }
        var noteLink = obsidianApp.metadataCache.fileToLinktext(currentNoteFile, currentNoteFile.path, true);
        var newMaterial = "[[" + noteLink + "#^" + lineBlockID + "]]";
        console.log(newMaterial);
        this.saveToWorkbench(newMaterial, "a link to the current block");
    };
    WorkbenchPlugin.prototype.embedBlockInWorkbench = function () {
        var obsidianApp = this.app;
        // get the block
        var currentView = obsidianApp.workspace.activeLeaf.view;
        var currentNoteFile = currentView.file;
        var editor = currentView.sourceMode.cmEditor;
        var cursor = editor.getCursor();
        var lineText = editor.getLine(cursor.line);
        console.log(lineText);
        console.log("Checking for block:");
        var lineBlockID = this.getBlock(lineText, currentNoteFile);
        console.log(lineBlockID);
        if (this.getBlock(lineText, currentNoteFile) === "") { // The line is not already a block
            console.log("This line is not currently a block. Adding a block ID.");
            lineBlockID = this.createBlockHash(lineText).toString();
            var lineWithBlock_3 = lineText + " ^" + lineBlockID;
            obsidianApp.vault.read(currentNoteFile).then(function (result) {
                var previousNoteText = result;
                var newNoteText = previousNoteText.replace(lineText, lineWithBlock_3);
                obsidianApp.vault.modify(currentNoteFile, newNoteText);
            });
        }
        var noteLink = obsidianApp.metadataCache.fileToLinktext(currentNoteFile, currentNoteFile.path, true);
        var newMaterial = "![[" + noteLink + "#^" + lineBlockID + "]]";
        console.log(newMaterial);
        this.saveToWorkbench(newMaterial, "a link to the current block");
    };
    WorkbenchPlugin.prototype.copyBlockIntoWorkbench = function () {
        var obsidianApp = this.app;
        var currentView = obsidianApp.workspace.activeLeaf.view;
        var editor = currentView.sourceMode.cmEditor;
        var cursor = editor.getCursor();
        var lineText = editor.getLine(cursor.line);
        console.log(lineText);
        var newMaterial = lineText;
        console.log(newMaterial);
        this.saveToWorkbench(newMaterial, "a copy of the current block");
    };
    WorkbenchPlugin.prototype.copyLineAndLinkToBlock = function () {
        var obsidianApp = this.app;
        var currentView = obsidianApp.workspace.activeLeaf.view;
        var currentNoteFile = currentView.file;
        var editor = currentView.sourceMode.cmEditor;
        var cursor = editor.getCursor();
        var lineText = editor.getLine(cursor.line);
        console.log(lineText);
        //trim block text tktktk
        var blockIDRegex = new RegExp("/(\s){0,1}[\^]{1}([a-zA-Z0-9\-]+)$/", "gim");
        var lineTextWithoutBlockID = lineText.replace(blockIDRegex, "");
        console.log("Checking for block:");
        var lineBlockID = this.getBlock(lineText, currentNoteFile);
        console.log(lineBlockID);
        if (this.getBlock(lineText, currentNoteFile) === "") { // The line is not already a block
            console.log("This line is not currently a block. Adding a block ID.");
            lineBlockID = this.createBlockHash(lineText).toString();
            var lineWithBlock_4 = lineText + " ^" + lineBlockID;
            obsidianApp.vault.read(currentNoteFile).then(function (result) {
                var previousNoteText = result;
                var newNoteText = previousNoteText.replace(lineText, lineWithBlock_4);
                obsidianApp.vault.modify(currentNoteFile, newNoteText);
            });
        }
        var noteLink = obsidianApp.metadataCache.fileToLinktext(currentNoteFile, currentNoteFile.path, true);
        var encodedNoteLink = encodeURIComponent(noteLink);
        var newMaterial = "[" + lineTextWithoutBlockID + "]" + "(" + encodedNoteLink + "#^" + lineBlockID + ")";
        console.log(newMaterial);
        this.saveToWorkbench(newMaterial, "a linked copy of the current block");
    };
    return WorkbenchPlugin;
}(obsidian.Plugin));
var WorkbenchSettings = /** @class */ (function () {
    function WorkbenchSettings() {
        this.workbenchNoteName = "Workbench";
        this.workbenchLinePrefix = "";
        this.altClickType = "Link";
        this.metaAltClickType = "Embed";
        this.includeBlankLine = false;
    }
    return WorkbenchSettings;
}());
var WorkbenchSettingTab = /** @class */ (function (_super) {
    __extends(WorkbenchSettingTab, _super);
    function WorkbenchSettingTab() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WorkbenchSettingTab.prototype.display = function () {
        var _this = this;
        var containerEl = this.containerEl;
        var plugin = this.plugin;
        containerEl.empty();
        containerEl.createEl('h2', { text: 'Workbench Settings' });
        new obsidian.Setting(containerEl)
            .setName('Workbench note name')
            .setDesc('Provide a title for the workbench note. Default is Workbench.')
            .addText(function (text) {
            return text
                .setPlaceholder('Workbench')
                .setValue(plugin.settings.workbenchNoteName)
                .onChange(function (value) {
                plugin.settings.workbenchNoteName = value;
                plugin.saveData(plugin.settings);
            });
        });
        new obsidian.Setting(containerEl)
            .setName('Workbench line prefix')
            .setDesc('Set the prefix to each line added to Workbench. Default is nothing.')
            .addText(function (text) {
            return text
                .setPlaceholder('')
                .setValue(plugin.settings.workbenchLinePrefix)
                .onChange(function (value) {
                plugin.settings.workbenchLinePrefix = value;
                plugin.saveData(plugin.settings);
            });
        });
        new obsidian.Setting(containerEl)
            .setName('Blank lines')
            .setDesc('Toggle whether there should be a blank line between each Workbench entry.')
            .addToggle(function (toggle) {
            toggle.setValue(plugin.settings.includeBlankLine);
            toggle.onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    plugin.settings.includeBlankLine = value;
                    console.log("Include blank lines between entries:" + value);
                    plugin.saveData(plugin.settings);
                    return [2 /*return*/];
                });
            }); });
        });
        new obsidian.Setting(containerEl)
            .setName('Alt+Click type')
            .setDesc('Set what happens when you alt+click on a link. Default is to copy the link into the Workbench. Note: if your cursor is not already on the targeted line, you may need to double-click!')
            .addDropdown(function (dropDown) {
            return dropDown
                .addOption("Link", "Link selected note in Workbench")
                .addOption("Embed", "Embed selected note in Workbench")
                .addOption("Nothing", "Nothing")
                .setValue(plugin.settings.altClickType)
                .onChange(function (value) {
                plugin.settings.altClickType = value;
                plugin.saveData(plugin.settings);
                _this.display();
            });
        });
        new obsidian.Setting(containerEl)
            .setName('Meta+Alt+Click type')
            .setDesc('Set what happens when you cmd/ctrl+alt+click on a line. Default is to link the line as a block into the Workbench. Note: if your cursor is not already on the targeted line, you may need to double-click!')
            .addDropdown(function (dropDown) {
            return dropDown
                .addOption("Link", "Link block")
                .addOption("Embed", "Embed block")
                .addOption("Copy", "Copy line")
                .addOption("Nothing", "Nothing")
                .setValue(plugin.settings.metaAltClickType)
                .onChange(function (value) {
                plugin.settings.metaAltClickType = value;
                plugin.saveData(plugin.settings);
                _this.display();
            });
        });
    };
    return WorkbenchSettingTab;
}(obsidian.PluginSettingTab));

module.exports = WorkbenchPlugin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsibm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsIm1haW4udHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxyXG5cclxuUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55XHJcbnB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZC5cclxuXHJcblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTIFdJVEhcclxuUkVHQVJEIFRPIFRISVMgU09GVFdBUkUgSU5DTFVESU5HIEFMTCBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZXHJcbkFORCBGSVRORVNTLiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SIEJFIExJQUJMRSBGT1IgQU5ZIFNQRUNJQUwsIERJUkVDVCxcclxuSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFUyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NXHJcbkxPU1MgT0YgVVNFLCBEQVRBIE9SIFBST0ZJVFMsIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SXHJcbk9USEVSIFRPUlRJT1VTIEFDVElPTiwgQVJJU0lORyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBVU0UgT1JcclxuUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXHJcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgICAgICB9XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fY3JlYXRlQmluZGluZyA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcclxuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfSk7XHJcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XHJcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xyXG4gICAgb1trMl0gPSBtW2tdO1xyXG59KTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgbykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAocCAhPT0gXCJkZWZhdWx0XCIgJiYgIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvLCBwKSkgX19jcmVhdGVCaW5kaW5nKG8sIG0sIHApO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIHMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLml0ZXJhdG9yLCBtID0gcyAmJiBvW3NdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgaWYgKG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSBcIm51bWJlclwiKSByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKHMgPyBcIk9iamVjdCBpcyBub3QgaXRlcmFibGUuXCIgOiBcIlN5bWJvbC5pdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5cygpIHtcclxuICAgIGZvciAodmFyIHMgPSAwLCBpID0gMCwgaWwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgaWw7IGkrKykgcyArPSBhcmd1bWVudHNbaV0ubGVuZ3RoO1xyXG4gICAgZm9yICh2YXIgciA9IEFycmF5KHMpLCBrID0gMCwgaSA9IDA7IGkgPCBpbDsgaSsrKVxyXG4gICAgICAgIGZvciAodmFyIGEgPSBhcmd1bWVudHNbaV0sIGogPSAwLCBqbCA9IGEubGVuZ3RoOyBqIDwgamw7IGorKywgaysrKVxyXG4gICAgICAgICAgICByW2tdID0gYVtqXTtcclxuICAgIHJldHVybiByO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaWYgKGdbbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBuID09PSBcInJldHVyblwiIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcclxuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XHJcbiAgICByZXR1cm4gY29va2VkO1xyXG59O1xyXG5cclxudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xyXG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcclxuICAgIG9bXCJkZWZhdWx0XCJdID0gdjtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XHJcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKGsgIT09IFwiZGVmYXVsdFwiICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSBfX2NyZWF0ZUJpbmRpbmcocmVzdWx0LCBtb2QsIGspO1xyXG4gICAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZEdldChyZWNlaXZlciwgcHJpdmF0ZU1hcCkge1xyXG4gICAgaWYgKCFwcml2YXRlTWFwLmhhcyhyZWNlaXZlcikpIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiYXR0ZW1wdGVkIHRvIGdldCBwcml2YXRlIGZpZWxkIG9uIG5vbi1pbnN0YW5jZVwiKTtcclxuICAgIH1cclxuICAgIHJldHVybiBwcml2YXRlTWFwLmdldChyZWNlaXZlcik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHJlY2VpdmVyLCBwcml2YXRlTWFwLCB2YWx1ZSkge1xyXG4gICAgaWYgKCFwcml2YXRlTWFwLmhhcyhyZWNlaXZlcikpIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiYXR0ZW1wdGVkIHRvIHNldCBwcml2YXRlIGZpZWxkIG9uIG5vbi1pbnN0YW5jZVwiKTtcclxuICAgIH1cclxuICAgIHByaXZhdGVNYXAuc2V0KHJlY2VpdmVyLCB2YWx1ZSk7XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbn1cclxuIiwiaW1wb3J0IHsgSGFzaCB9IGZyb20gJ2NyeXB0byc7XHJcbmltcG9ydCB7IEFwcCwgTWFya2Rvd25QcmV2aWV3VmlldywgTm90aWNlLCBQbHVnaW4sIFBsdWdpblNldHRpbmdUYWIsIFNldHRpbmcsIFRvZ2dsZUNvbXBvbmVudCB9IGZyb20gJ29ic2lkaWFuJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdvcmtiZW5jaFBsdWdpbiBleHRlbmRzIFBsdWdpbiB7XHJcblx0c2V0dGluZ3M6IFdvcmtiZW5jaFNldHRpbmdzO1xyXG5cclxuXHRhc3luYyBvbmxvYWQoKSB7XHJcblx0XHRjb25zb2xlLmxvZygnTG9hZGluZyB0aGUgV29ya2JlbmNoIHBsdWdpbi4nKTtcclxuXHRcdFxyXG5cdFx0Ly9sb2FkIGRhdGEgZnJvbSBzYXZlZCBzZXR0aW5nc1xyXG5cdFx0dGhpcy5zZXR0aW5ncyA9IChhd2FpdCB0aGlzLmxvYWREYXRhKCkpIHx8IG5ldyBXb3JrYmVuY2hTZXR0aW5ncygpO1xyXG5cclxuXHJcblx0XHR0aGlzLmFkZFJpYmJvbkljb24oJ3BlbmNpbCcsICdXb3JrYmVuY2gnLCAoKSA9PiB7XHJcblx0XHRcdGxldCBvYnNpZGlhbkFwcCA9IHRoaXMuYXBwO1xyXG5cdFx0XHRsZXQgd29ya2JlbmNoTm90ZVRpdGxlID0gdGhpcy5zZXR0aW5ncy53b3JrYmVuY2hOb3RlTmFtZTtcclxuXHJcblx0XHRcdGxldCBmaWxlcyA9IG9ic2lkaWFuQXBwLnZhdWx0LmdldEZpbGVzKCk7XHJcblx0XHRcdFx0Y29uc3Qgd29ya2JlbmNoTm90ZUZpbGUgPSBmaWxlcy5maWx0ZXIoZSA9PiBlLm5hbWUgPT09IHdvcmtiZW5jaE5vdGVUaXRsZSAvL2hhdC10aXAg8J+OqSB0byBATXJKYWNrUGhpbCBmb3IgdGhpcyBsaXR0bGUgd29ya2Zsb3cgXHJcblx0XHRcdFx0XHR8fCBlLnBhdGggPT09IHdvcmtiZW5jaE5vdGVUaXRsZVxyXG5cdFx0XHRcdFx0fHwgZS5iYXNlbmFtZSA9PT0gd29ya2JlbmNoTm90ZVRpdGxlXHJcblx0XHRcdFx0KVswXTtcclxuXHJcblx0XHRcdG9ic2lkaWFuQXBwLndvcmtzcGFjZS5vcGVuTGlua1RleHQod29ya2JlbmNoTm90ZVRpdGxlLCB3b3JrYmVuY2hOb3RlRmlsZS5wYXRoLCB0cnVlLCBNYXJrZG93blByZXZpZXdWaWV3KTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdHRoaXMuYWRkQ29tbWFuZCh7XHJcblx0XHRcdGlkOiAnd29ya2JlbmNoLWxpbmstY3VycmVudC1ub3RlJyxcclxuXHRcdFx0bmFtZTogJ0xpbmsgdGhlIGN1cnJlbnQgbm90ZS9wYWdlIGluIHlvdXIgV29ya2JlbmNoLicsXHJcblx0XHRcdC8vIGNhbGxiYWNrOiAoKSA9PiB7XHJcblx0XHRcdC8vIFx0Y29uc29sZS5sb2coJ1NpbXBsZSBDYWxsYmFjaycpO1xyXG5cdFx0XHQvLyB9LFxyXG5cdFx0XHRjaGVja0NhbGxiYWNrOiAoY2hlY2tpbmc6IGJvb2xlYW4pID0+IHsgXHJcblx0XHRcdFx0bGV0IGxlYWYgPSB0aGlzLmFwcC53b3Jrc3BhY2UuYWN0aXZlTGVhZjtcclxuXHRcdFx0XHRpZiAobGVhZikge1xyXG5cdFx0XHRcdFx0aWYgKCFjaGVja2luZykge1xyXG5cdFx0XHRcdFx0XHR0aGlzLmxpbmtOb3RlSW5Xb3JrYmVuY2goKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdHRoaXMuYWRkQ29tbWFuZCh7IFxyXG5cdFx0XHRpZDogJ3dvcmtiZW5jaC1lbWJlZC1jdXJyZW50LW5vdGUnLFxyXG5cdFx0XHRuYW1lOiAnRW1iZWQgdGhlIGN1cnJlbnQgbm90ZS9wYWdlIGluIHlvdXIgV29ya2JlbmNoLicsXHJcblx0XHRcdC8vIGNhbGxiYWNrOiAoKSA9PiB7XHJcblx0XHRcdC8vIFx0Y29uc29sZS5sb2coJ1NpbXBsZSBDYWxsYmFjaycpO1xyXG5cdFx0XHQvLyB9LFxyXG5cdFx0XHRjaGVja0NhbGxiYWNrOiAoY2hlY2tpbmc6IGJvb2xlYW4pID0+IHsgXHJcblx0XHRcdFx0bGV0IGxlYWYgPSB0aGlzLmFwcC53b3Jrc3BhY2UuYWN0aXZlTGVhZjtcclxuXHRcdFx0XHRpZiAobGVhZikge1xyXG5cdFx0XHRcdFx0aWYgKCFjaGVja2luZykge1xyXG5cdFx0XHRcdFx0XHR0aGlzLmVtYmVkTm90ZUluV29ya2JlbmNoKCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHR0aGlzLmFkZENvbW1hbmQoeyBcclxuXHRcdFx0aWQ6ICd3b3JrYmVuY2gtbGluay1jdXJyZW50LWJsb2NrJyxcclxuXHRcdFx0bmFtZTogJ0xpbmsgdGhlIGN1cnJlbnQgbGluZS9ibG9jayBpbiB5b3VyIFdvcmtiZW5jaC4nLFxyXG5cdFx0XHQvLyBjYWxsYmFjazogKCkgPT4ge1xyXG5cdFx0XHQvLyBcdGNvbnNvbGUubG9nKCdTaW1wbGUgQ2FsbGJhY2snKTtcclxuXHRcdFx0Ly8gfSxcclxuXHRcdFx0Y2hlY2tDYWxsYmFjazogKGNoZWNraW5nOiBib29sZWFuKSA9PiB7IFxyXG5cdFx0XHRcdGxldCBsZWFmID0gdGhpcy5hcHAud29ya3NwYWNlLmFjdGl2ZUxlYWY7XHJcblx0XHRcdFx0aWYgKGxlYWYpIHtcclxuXHRcdFx0XHRcdGlmICghY2hlY2tpbmcpIHtcclxuXHRcdFx0XHRcdFx0dGhpcy5saW5rQmxvY2tJbldvcmtiZW5jaCgpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0dGhpcy5hZGRDb21tYW5kKHsgXHJcblx0XHRcdGlkOiAnd29ya2JlbmNoLWVtYmVkLWN1cnJlbnQtYmxvY2snLFxyXG5cdFx0XHRuYW1lOiAnRW1iZWQgdGhlIGN1cnJlbnQgbGluZS9ibG9jayBpbnRvIHlvdXIgV29ya2JlbmNoLicsXHJcblx0XHRcdC8vIGNhbGxiYWNrOiAoKSA9PiB7XHJcblx0XHRcdC8vIFx0Y29uc29sZS5sb2coJ1NpbXBsZSBDYWxsYmFjaycpO1xyXG5cdFx0XHQvLyB9LFxyXG5cdFx0XHRjaGVja0NhbGxiYWNrOiAoY2hlY2tpbmc6IGJvb2xlYW4pID0+IHsgXHJcblx0XHRcdFx0bGV0IGxlYWYgPSB0aGlzLmFwcC53b3Jrc3BhY2UuYWN0aXZlTGVhZjtcclxuXHRcdFx0XHRpZiAobGVhZikge1xyXG5cdFx0XHRcdFx0aWYgKCFjaGVja2luZykge1xyXG5cdFx0XHRcdFx0XHR0aGlzLmVtYmVkQmxvY2tJbldvcmtiZW5jaCgpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0dGhpcy5hZGRDb21tYW5kKHsgXHJcblx0XHRcdGlkOiAnd29ya2JlbmNoLWNvcHktY3VycmVudC1ibG9jaycsXHJcblx0XHRcdG5hbWU6ICdDb3B5IHRoZSBjdXJyZW50IGxpbmUvYmxvY2sgaW50byB5b3VyIFdvcmtiZW5jaC4nLFxyXG5cdFx0XHQvLyBjYWxsYmFjazogKCkgPT4ge1xyXG5cdFx0XHQvLyBcdGNvbnNvbGUubG9nKCdTaW1wbGUgQ2FsbGJhY2snKTtcclxuXHRcdFx0Ly8gfSxcclxuXHRcdFx0Y2hlY2tDYWxsYmFjazogKGNoZWNraW5nOiBib29sZWFuKSA9PiB7IFxyXG5cdFx0XHRcdGxldCBsZWFmID0gdGhpcy5hcHAud29ya3NwYWNlLmFjdGl2ZUxlYWY7XHJcblx0XHRcdFx0aWYgKGxlYWYpIHtcclxuXHRcdFx0XHRcdGlmICghY2hlY2tpbmcpIHtcclxuXHRcdFx0XHRcdFx0dGhpcy5jb3B5QmxvY2tJbnRvV29ya2JlbmNoKCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHR0aGlzLmFkZENvbW1hbmQoeyBcclxuXHRcdFx0aWQ6ICd3b3JrYmVuY2gtY29weS1hbmQtbGluay1jdXJyZW50LWJsb2NrJyxcclxuXHRcdFx0bmFtZTogJ0NvcHkgdGhlIGN1cnJlbnQgbGluZSBpdHMgYmxvY2stbGluayBpbnRvIHlvdXIgV29ya2JlbmNoLicsXHJcblx0XHRcdC8vIGNhbGxiYWNrOiAoKSA9PiB7XHJcblx0XHRcdC8vIFx0Y29uc29sZS5sb2coJ1NpbXBsZSBDYWxsYmFjaycpO1xyXG5cdFx0XHQvLyB9LFxyXG5cdFx0XHRjaGVja0NhbGxiYWNrOiAoY2hlY2tpbmc6IGJvb2xlYW4pID0+IHsgXHJcblx0XHRcdFx0bGV0IGxlYWYgPSB0aGlzLmFwcC53b3Jrc3BhY2UuYWN0aXZlTGVhZjtcclxuXHRcdFx0XHRpZiAobGVhZikge1xyXG5cdFx0XHRcdFx0aWYgKCFjaGVja2luZykge1xyXG5cdFx0XHRcdFx0XHR0aGlzLmNvcHlMaW5lQW5kTGlua1RvQmxvY2soKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdHRoaXMuYWRkQ29tbWFuZCh7IFxyXG5cdFx0XHRpZDogJ3dvcmtiZW5jaC1saW5rLWN1cnJlbnQtc2VjdGlvbicsXHJcblx0XHRcdG5hbWU6ICdMaW5rIHRoZSBjdXJyZW50IGhlYWRpbmcvc2VjdGlvbiBpbnRvIHlvdXIgV29ya2JlbmNoLicsXHJcblx0XHRcdC8vIGNhbGxiYWNrOiAoKSA9PiB7XHJcblx0XHRcdC8vIFx0Y29uc29sZS5sb2coJ1NpbXBsZSBDYWxsYmFjaycpO1xyXG5cdFx0XHQvLyB9LFxyXG5cdFx0XHRjaGVja0NhbGxiYWNrOiAoY2hlY2tpbmc6IGJvb2xlYW4pID0+IHsgXHJcblx0XHRcdFx0bGV0IGxlYWYgPSB0aGlzLmFwcC53b3Jrc3BhY2UuYWN0aXZlTGVhZjtcclxuXHRcdFx0XHRpZiAobGVhZikge1xyXG5cdFx0XHRcdFx0aWYgKCFjaGVja2luZykge1xyXG5cdFx0XHRcdFx0XHR0aGlzLmxpbmtTZWN0aW9uSW5Xb3JrYmVuY2goKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdHRoaXMuYWRkQ29tbWFuZCh7IFxyXG5cdFx0XHRpZDogJ3dvcmtiZW5jaC1lbWJlZC1jdXJyZW50LXNlY3Rpb24nLFxyXG5cdFx0XHRuYW1lOiAnRW1iZWQgdGhlIGN1cnJlbnQgaGVhZGluZy9zZWN0aW9uIGludG8geW91ciBXb3JrYmVuY2guJyxcclxuXHRcdFx0Ly8gY2FsbGJhY2s6ICgpID0+IHtcclxuXHRcdFx0Ly8gXHRjb25zb2xlLmxvZygnU2ltcGxlIENhbGxiYWNrJyk7XHJcblx0XHRcdC8vIH0sXHJcblx0XHRcdGNoZWNrQ2FsbGJhY2s6IChjaGVja2luZzogYm9vbGVhbikgPT4geyBcclxuXHRcdFx0XHRsZXQgbGVhZiA9IHRoaXMuYXBwLndvcmtzcGFjZS5hY3RpdmVMZWFmO1xyXG5cdFx0XHRcdGlmIChsZWFmKSB7XHJcblx0XHRcdFx0XHRpZiAoIWNoZWNraW5nKSB7XHJcblx0XHRcdFx0XHRcdHRoaXMuZW1iZWRTZWN0aW9uSW5Xb3JrYmVuY2goKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdHRoaXMuYWRkQ29tbWFuZCh7IFxyXG5cdFx0XHRpZDogJ2NsZWFyLXdvcmtiZW5jaCcsXHJcblx0XHRcdG5hbWU6ICdDbGVhciB0aGUgd29ya2JlbmNoIG5vdGUuJyxcclxuXHRcdFx0Ly8gY2FsbGJhY2s6ICgpID0+IHtcclxuXHRcdFx0Ly8gXHRjb25zb2xlLmxvZygnU2ltcGxlIENhbGxiYWNrJyk7XHJcblx0XHRcdC8vIH0sXHJcblx0XHRcdGNhbGxiYWNrOiAoKSA9PiB7IFxyXG5cdFx0XHRcdHRoaXMuY2xlYXJXb3JrYmVuY2goKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0dGhpcy5hZGRDb21tYW5kKHsgXHJcblx0XHRcdGlkOiAnaW5zZXJ0LXdvcmtiZW5jaCcsXHJcblx0XHRcdG5hbWU6ICdJbnNlcnQgdGhlIGNvbnRlbnRzIG9mIHRoZSB3b3JrYmVuY2ggbm90ZS4nLFxyXG5cdFx0XHQvLyBjYWxsYmFjazogKCkgPT4ge1xyXG5cdFx0XHQvLyBcdGNvbnNvbGUubG9nKCdTaW1wbGUgQ2FsbGJhY2snKTtcclxuXHRcdFx0Ly8gfSxcclxuXHRcdFx0Y2hlY2tDYWxsYmFjazogKGNoZWNraW5nOiBib29sZWFuKSA9PiB7IFxyXG5cdFx0XHRcdGxldCBsZWFmID0gdGhpcy5hcHAud29ya3NwYWNlLmFjdGl2ZUxlYWY7XHJcblx0XHRcdFx0aWYgKGxlYWYpIHtcclxuXHRcdFx0XHRcdGlmICghY2hlY2tpbmcpIHtcclxuXHRcdFx0XHRcdFx0dGhpcy5pbnNlcnRXb3JrYmVuY2goKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdHRoaXMuYWRkU2V0dGluZ1RhYihuZXcgV29ya2JlbmNoU2V0dGluZ1RhYih0aGlzLmFwcCwgdGhpcykpO1xyXG5cclxuXHRcdC8qdGhpcy5yZWdpc3RlckV2ZW50KHRoaXMuYXBwLm9uKCdjb2RlbWlycm9yJywgKGNtOiBDb2RlTWlycm9yLkVkaXRvcikgPT4ge1xyXG5cdFx0XHRjb25zb2xlLmxvZygnY29kZW1pcnJvcicsIGNtKTtcclxuXHRcdH0pKTsgKi9cclxuXHJcblx0XHR0aGlzLnJlZ2lzdGVyRG9tRXZlbnQoZG9jdW1lbnQsICdjbGljaycsIChldnQ6IE1vdXNlRXZlbnQpID0+IHtcclxuXHRcdFx0aWYgKHRoaXMuc2V0dGluZ3MuYWx0Q2xpY2tUeXBlICE9IFwiTm90aGluZ1wiKSB7XHJcblx0XHRcdFx0aWYgKGV2dC5hbHRLZXkpIHtcclxuXHRcdFx0XHRcdGlmICgoZXZ0LnRhcmdldC5jbGFzc05hbWUgPT09IFwiaW50ZXJuYWwtbGlua1wiKSB8fCAoZXZ0LnRhcmdldC5jbGFzc05hbWUuaW5jbHVkZXMoXCJjbS1obWQtaW50ZXJuYWwtbGlua1wiKSkpIHtcclxuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coXCJhbHRcIik7XHJcblx0XHRcdFx0XHRcdHRoaXMuYWx0Q2xpY2soZXZ0KTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKHRoaXMuc2V0dGluZ3MubWV0YUFsdENsaWNrVHlwZSAhPSBcIk5vdGhpbmdcIikge1xyXG5cdFx0XHRcdGlmIChldnQubWV0YUtleSAmJiBldnQuYWx0S2V5KSB7XHJcblx0XHRcdFx0XHRpZiAoKGV2dC50YXJnZXQuY2xhc3NOYW1lLmluY2x1ZGVzKFwiY20taG1kLWludGVybmFsLWxpbmtcIikpKSB7XHJcblx0XHRcdFx0XHRcdG5ldyBOb3RpY2UoXCJTb3JyeSwgdGhpcyBkb2Vzbid0IHdvcmsgd2hlbiB5b3UgY2xpY2sgZGlyZWN0bHkgb24gYSBsaW5rLiBUcnkgY2xpY2tpbmcgb3V0c2lkZSBvZiB0aGUgbGluayFcIik7XHJcblx0XHRcdFx0XHR9IGVsc2UgaWYgKChldnQudGFyZ2V0LmNsYXNzTmFtZS5pbmNsdWRlcyhcIkNvZGVNaXJyb3ItbGluZVwiKSkgfHwgZXZ0LnRhcmdldC5jbGFzc05hbWUuaW5jbHVkZXMoXCJjbVwiKSkge1xyXG5cdFx0XHRcdFx0XHRsZXQgY3VycmVudEZpbGUgPSB0aGlzLmFwcC53b3Jrc3BhY2UuYWN0aXZlTGVhZi52aWV3LmZpbGU7XHJcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKFwibWV0YSthbHRcIik7XHJcblx0XHRcdFx0XHRcdHRoaXMubWV0YUFsdENsaWNrKGV2dCwgY3VycmVudEZpbGUpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRvbnVubG9hZCgpIHtcclxuXHRcdGNvbnNvbGUubG9nKCdVbmxvYWRpbmcgdGhlIFdvcmtiZW5jaCBwbHVnaW4uJyk7XHJcblx0fVxyXG5cclxuXHRpbnNlcnRXb3JrYmVuY2goKSB7XHJcblx0XHRsZXQgb2JzaWRpYW5BcHAgPSB0aGlzLmFwcDtcclxuXHRcdGxldCB3b3JrYmVuY2hOb3RlVGl0bGUgPSB0aGlzLnNldHRpbmdzLndvcmtiZW5jaE5vdGVOYW1lO1xyXG5cdFx0bGV0IGZpbGVzID0gb2JzaWRpYW5BcHAudmF1bHQuZ2V0RmlsZXMoKTtcclxuXHRcdFx0Y29uc3Qgd29ya2JlbmNoTm90ZUZpbGUgPSBmaWxlcy5maWx0ZXIoZSA9PiBlLm5hbWUgPT09IHdvcmtiZW5jaE5vdGVUaXRsZSAvL2hhdC10aXAg8J+OqSB0byBATXJKYWNrUGhpbCBmb3IgdGhpcyBsaXR0bGUgd29ya2Zsb3cgXHJcblx0XHRcdFx0fHwgZS5wYXRoID09PSB3b3JrYmVuY2hOb3RlVGl0bGVcclxuXHRcdFx0XHR8fCBlLmJhc2VuYW1lID09PSB3b3JrYmVuY2hOb3RlVGl0bGVcclxuXHRcdFx0KVswXTtcclxuXHRcdFxyXG5cdFx0bGV0IGN1cnJlbnROb3RlRmlsZSA9IG9ic2lkaWFuQXBwLndvcmtzcGFjZS5hY3RpdmVMZWFmLnZpZXcuZmlsZTtcclxuXHJcblx0XHRsZXQgZWRpdG9yID0gb2JzaWRpYW5BcHAud29ya3NwYWNlLmFjdGl2ZUxlYWYudmlldy5zb3VyY2VNb2RlLmNtRWRpdG9yO1xyXG5cdFx0bGV0IGN1cnNvciA9IGVkaXRvci5nZXRDdXJzb3IoKTtcclxuXHRcdGNvbnNvbGUubG9nKGN1cnNvcik7XHJcblx0XHRsZXQgZG9jID0gZWRpdG9yLmdldERvYygpO1xyXG5cclxuXHRcdG9ic2lkaWFuQXBwLnZhdWx0LnJlYWQod29ya2JlbmNoTm90ZUZpbGUpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG5cdFx0XHRkb2MucmVwbGFjZVJhbmdlKHJlc3VsdCwgY3Vyc29yKTtcclxuXHRcdFx0ZWRpdG9yLmZvY3VzKCk7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdGNsZWFyV29ya2JlbmNoKCkge1xyXG5cdFx0bGV0IG9ic2lkaWFuQXBwID0gdGhpcy5hcHA7XHJcblx0XHRsZXQgd29ya2JlbmNoTm90ZVRpdGxlID0gdGhpcy5zZXR0aW5ncy53b3JrYmVuY2hOb3RlTmFtZTtcclxuXHRcdGxldCBlZGl0b3IgPSBvYnNpZGlhbkFwcC53b3Jrc3BhY2UuYWN0aXZlTGVhZi52aWV3LnNvdXJjZU1vZGUuY21FZGl0b3I7XHJcblx0XHRsZXQgY3Vyc29yID0gZWRpdG9yLmdldEN1cnNvcigpO1xyXG5cdFx0bGV0IGZpbGVzID0gb2JzaWRpYW5BcHAudmF1bHQuZ2V0RmlsZXMoKTtcclxuXHRcdFx0Y29uc3Qgd29ya2JlbmNoTm90ZUZpbGUgPSBmaWxlcy5maWx0ZXIoZSA9PiBlLm5hbWUgPT09IHdvcmtiZW5jaE5vdGVUaXRsZSAvL2hhdC10aXAg8J+OqSB0byBATXJKYWNrUGhpbCBmb3IgdGhpcyBsaXR0bGUgd29ya2Zsb3cgXHJcblx0XHRcdFx0fHwgZS5wYXRoID09PSB3b3JrYmVuY2hOb3RlVGl0bGVcclxuXHRcdFx0XHR8fCBlLmJhc2VuYW1lID09PSB3b3JrYmVuY2hOb3RlVGl0bGVcclxuXHRcdFx0KVswXTtcclxuXHJcblx0XHRvYnNpZGlhbkFwcC52YXVsdC5tb2RpZnkod29ya2JlbmNoTm90ZUZpbGUsIFwiXCIpO1xyXG5cdFx0ZWRpdG9yLnNldEN1cnNvcihjdXJzb3IpO1xyXG5cdFx0ZWRpdG9yLmZvY3VzKCk7XHJcblx0fVxyXG5cclxuXHRzYXZlVG9Xb3JrYmVuY2godGhlTWF0ZXJpYWw6IHN0cmluZywgc2F2ZUFjdGlvbjogc3RyaW5nKSB7XHJcblx0XHRsZXQgb2JzaWRpYW5BcHAgPSB0aGlzLmFwcDtcclxuXHRcdGxldCBlZGl0b3IgPSBvYnNpZGlhbkFwcC53b3Jrc3BhY2UuYWN0aXZlTGVhZi52aWV3LnNvdXJjZU1vZGUuY21FZGl0b3I7XHJcblx0XHRsZXQgY3Vyc29yID0gZWRpdG9yLmdldEN1cnNvcigpO1xyXG5cdFx0bGV0IGJsYW5rTGluZSA9IHRoaXMuc2V0dGluZ3MuaW5jbHVkZUJsYW5rTGluZTtcclxuXHJcblx0XHRsZXQgbGluZVByZWZpeCA9IHRoaXMuc2V0dGluZ3Mud29ya2JlbmNoTGluZVByZWZpeDtcclxuXHJcblx0XHRjb25zb2xlLmxvZyhsaW5lUHJlZml4ICsgdGhlTWF0ZXJpYWwpO1xyXG5cclxuXHRcdGxldCB3b3JrYmVuY2hOb3RlVGl0bGUgPSB0aGlzLnNldHRpbmdzLndvcmtiZW5jaE5vdGVOYW1lO1xyXG5cclxuXHRcdGxldCBmaWxlcyA9IG9ic2lkaWFuQXBwLnZhdWx0LmdldEZpbGVzKCk7XHJcblx0XHRcdGNvbnN0IHdvcmtiZW5jaE5vdGVGaWxlID0gZmlsZXMuZmlsdGVyKGUgPT4gZS5uYW1lID09PSB3b3JrYmVuY2hOb3RlVGl0bGUgLy9oYXQtdGlwIPCfjqkgdG8gQE1ySmFja1BoaWwgZm9yIHRoaXMgbGl0dGxlIHdvcmtmbG93IFxyXG5cdFx0XHRcdHx8IGUucGF0aCA9PT0gd29ya2JlbmNoTm90ZVRpdGxlXHJcblx0XHRcdFx0fHwgZS5iYXNlbmFtZSA9PT0gd29ya2JlbmNoTm90ZVRpdGxlXHJcblx0XHRcdClbMF07XHJcblxyXG5cdFx0Y29uc29sZS5sb2coXCJXb3JrYmVuY2ggbm90ZTpcIiArIHdvcmtiZW5jaE5vdGVGaWxlKTtcclxuXHJcblx0XHRpZiAoIXdvcmtiZW5jaE5vdGVGaWxlKSB7XHJcblx0XHRcdGNvbnNvbGUubG9nKFwiVGhlIHdvcmtiZW5jaCBub3RlIGRvZXMgbm90IGFscmVhZHkgZXhpc3QuIENyZWF0aW5nIGl0LCB0aGVuIGFwcGVuZGluZyB0aGUgbmV3IGNvbnRlbnQgdG8gaXQuXCIpO1xyXG5cclxuXHRcdFx0bGV0IG5vdGVUZXh0ID0gbGluZVByZWZpeCArIHRoZU1hdGVyaWFsO1xyXG5cdFx0XHRsZXQgbmV3V29ya2JlbmNoRmlsZSA9IG9ic2lkaWFuQXBwLnZhdWx0LmNyZWF0ZSh3b3JrYmVuY2hOb3RlVGl0bGUgKyBcIi5tZFwiLCBub3RlVGV4dCk7XHJcblx0XHR9IGVsc2UgeyAvLyBUaGUgZmlsZSBleGlzdHMgXHJcblx0XHRcdGNvbnNvbGUubG9nKFwiVGhlIHdvcmtiZW5jaCBub3RlIGFscmVhZHkgZXhpc3RzLiBBcHBlbmRpbmcgdGhlIG5ldyBjb250ZW50IHRvIGl0LlwiKTtcclxuXHRcdFx0bGV0IHByZXZpb3VzTm90ZVRleHQgPSBcIlwiO1xyXG5cdFx0XHRvYnNpZGlhbkFwcC52YXVsdC5yZWFkKHdvcmtiZW5jaE5vdGVGaWxlKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuXHRcdFx0XHRsZXQgcHJldmlvdXNOb3RlVGV4dCA9IHJlc3VsdDtcclxuXHRcdFx0XHQvL2NvbnNvbGUubG9nKFwiUHJldmlvdXMgbm90ZSB0ZXh0OlxcblwiICsgcHJldmlvdXNOb3RlVGV4dCk7XHJcblx0XHRcdFx0bGV0IGxpbmVTcGFjaW5nID0gXCJcXG5cIjtcclxuXHRcdFx0XHRpZiAoYmxhbmtMaW5lKSB7XHJcblx0XHRcdFx0XHRsaW5lU3BhY2luZyA9IFwiXFxuXFxuXCI7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGxldCBuZXdOb3RlVGV4dCA9IHByZXZpb3VzTm90ZVRleHQgKyBsaW5lU3BhY2luZyArIGxpbmVQcmVmaXggKyB0aGVNYXRlcmlhbDtcclxuXHRcdFx0XHRvYnNpZGlhbkFwcC52YXVsdC5tb2RpZnkod29ya2JlbmNoTm90ZUZpbGUsIG5ld05vdGVUZXh0KTtcclxuXHRcdFx0XHRuZXcgTm90aWNlKFwiQWRkZWQgXCIgKyBzYXZlQWN0aW9uICsgXCIgdG8gdGhlIHdvcmtiZW5jaC5cIilcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0XHRlZGl0b3Iuc2V0Q3Vyc29yKGN1cnNvcik7XHJcblx0XHRlZGl0b3IuZm9jdXMoKTtcclxuXHR9XHJcblxyXG5cdGNyZWF0ZUJsb2NrSGFzaChpbnB1dFRleHQ6IHN0cmluZyk6IHN0cmluZyB7IC8vIENyZWRpdCB0byBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMTM0OTQyNlxyXG5cdFx0XHRsZXQgb2JzaWRpYW5BcHAgPSB0aGlzLmFwcDtcclxuXHJcblx0XHRcdGxldCByZXN1bHQgPSAnJztcclxuXHRcdFx0dmFyIGNoYXJhY3RlcnMgPSAnYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5JztcclxuXHRcdFx0dmFyIGNoYXJhY3RlcnNMZW5ndGggPSBjaGFyYWN0ZXJzLmxlbmd0aDtcclxuXHRcdFx0Zm9yICggdmFyIGkgPSAwOyBpIDwgNzsgaSsrICkge1xyXG5cdFx0XHQgICByZXN1bHQgKz0gY2hhcmFjdGVycy5jaGFyQXQoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogY2hhcmFjdGVyc0xlbmd0aCkpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiByZXN1bHQ7XHJcblx0fVxyXG5cclxuXHRnZXRCbG9jayhpbnB1dExpbmU6IHN0cmluZywgbm90ZUZpbGU6IG9iamVjdCk6IHN0cmluZyB7IC8vUmV0dXJucyB0aGUgc3RyaW5nIG9mIGEgYmxvY2sgSUQgaWYgYmxvY2sgaXMgZm91bmQsIG9yIFwiXCIgaWYgbm90LlxyXG5cdFx0bGV0IG9ic2lkaWFuQXBwID0gdGhpcy5hcHA7XHJcblx0XHRsZXQgbm90ZUJsb2NrcyA9IG9ic2lkaWFuQXBwLm1ldGFkYXRhQ2FjaGUuZ2V0RmlsZUNhY2hlKG5vdGVGaWxlKS5ibG9ja3M7XHJcblx0XHRjb25zb2xlLmxvZyhcIkNoZWNraW5nIGlmIGxpbmUgJ1wiICsgaW5wdXRMaW5lICsgXCInIGlzIGEgYmxvY2suXCIpO1xyXG5cdFx0bGV0IGJsb2NrU3RyaW5nID0gXCJcIjtcclxuXHRcdGlmIChub3RlQmxvY2tzKSB7IC8vIHRoZSBmaWxlIGRvZXMgY29udGFpbiBibG9ja3MuIElmIG5vdCwgcmV0dXJuIFwiXCJcclxuXHRcdFx0Zm9yIChsZXQgZWFjaEJsb2NrIGluIG5vdGVCbG9ja3MpIHsgLy8gaXRlcmF0ZSB0aHJvdWdoIHRoZSBibG9ja3MuIFxyXG5cdFx0XHRcdGNvbnNvbGUubG9nKFwiQ2hlY2tpbmcgYmxvY2sgXlwiICsgZWFjaEJsb2NrKTtcclxuXHRcdFx0XHRsZXQgYmxvY2tSZWdFeHAgPSBuZXcgUmVnRXhwKFwiKFwiICsgZWFjaEJsb2NrICsgXCIpJFwiLCBcImdpbVwiKTtcclxuXHRcdFx0XHRpZiAoaW5wdXRMaW5lLm1hdGNoKGJsb2NrUmVnRXhwKSkgeyAvLyBpZiBlbmQgb2YgaW5wdXRMaW5lIG1hdGNoZXMgYmxvY2ssIHJldHVybiBpdFxyXG5cdFx0XHRcdFx0YmxvY2tTdHJpbmcgPSBlYWNoQmxvY2s7XHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhcIkZvdW5kIGJsb2NrIF5cIiArIGJsb2NrU3RyaW5nKTtcclxuXHRcdFx0XHRcdHJldHVybiBibG9ja1N0cmluZztcclxuXHRcdFx0XHR9IFxyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBibG9ja1N0cmluZztcclxuXHRcdH0gXHJcblx0XHRyZXR1cm4gYmxvY2tTdHJpbmc7XHJcblx0fVxyXG5cclxuXHRhbHRDbGljayhzb21lTW91c2VFdmVudDogRXZlbnQpIHtcclxuXHRcdGxldCBvYnNpZGlhbkFwcCA9IHRoaXMuYXBwO1xyXG5cclxuXHRcdGxldCBjbGlja1R5cGUgPSB0aGlzLnNldHRpbmdzLmFsdENsaWNrVHlwZTtcclxuXHJcblx0XHRsZXQgbGlua1ByZWZpeCA9IFwiXCI7XHJcblx0XHRpZiAoY2xpY2tUeXBlID09PSBcIkVtYmVkXCIpIHtcclxuXHRcdFx0bGlua1ByZWZpeCA9IFwiIVwiO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBuZXdNYXRlcmlhbCA9IGxpbmtQcmVmaXggKyBcIltbXCIgKyBzb21lTW91c2VFdmVudC50YXJnZXQuaW5uZXJUZXh0ICsgXCJdXVwiO1xyXG5cdFx0dGhpcy5zYXZlVG9Xb3JrYmVuY2gobmV3TWF0ZXJpYWwsIFwiYSBsaW5rIHRvIHRoZSBzZWxlY3RlZCBub3RlXCIpO1xyXG5cdH1cclxuXHJcblx0bWV0YUFsdENsaWNrKHNvbWVNb3VzZUV2ZW50OiBFdmVudCwgYWN0aXZlRmlsZTogb2JqZWN0KSB7XHJcblx0XHRjb25zb2xlLmxvZyhcIk1ldGEgYWx0IGNsaWNrXCIpO1xyXG5cclxuXHRcdGxldCBvYnNpZGlhbkFwcCA9IHRoaXMuYXBwO1xyXG5cclxuXHRcdGxldCBsaW5lVGV4dCA9IHNvbWVNb3VzZUV2ZW50LnRhcmdldC5pbm5lclRleHQ7XHJcblxyXG5cdFx0aWYgKChzb21lTW91c2VFdmVudC50YXJnZXQuY2xhc3NOYW1lLmluY2x1ZGVzKFwiY21cIikpKSB7XHJcblx0XHRcdGxpbmVUZXh0ID0gc29tZU1vdXNlRXZlbnQudGFyZ2V0LnBhcmVudE5vZGUuaW5uZXJUZXh0O1xyXG5cdFx0fVxyXG5cclxuXHRcdGNvbnNvbGUubG9nKFwiVGhlIGNvbnRlbnRzIG9mIHRoZSBsaW5lIGFyZTogXCIgKyBsaW5lVGV4dCk7XHJcblxyXG5cdFx0Ly8gR2V0IHRoZSBmaWxlIGFuZCBjcmVhdGUgYSBsaW5rIHRvIGl0XHJcblx0XHRsZXQgY3VycmVudE5vdGVGaWxlID0gYWN0aXZlRmlsZTtcclxuXHRcdGxldCBub3RlTGluayA9IG9ic2lkaWFuQXBwLm1ldGFkYXRhQ2FjaGUuZmlsZVRvTGlua3RleHQoY3VycmVudE5vdGVGaWxlLCBjdXJyZW50Tm90ZUZpbGUucGF0aCwgdHJ1ZSk7XHJcblxyXG5cdFx0bGV0IGNsaWNrVHlwZSA9IHRoaXMuc2V0dGluZ3MubWV0YUFsdENsaWNrVHlwZTtcclxuXHJcblx0XHRpZiAobGluZVRleHQgIT0gXCJcIikge1xyXG5cclxuXHRcdFx0aWYgKGNsaWNrVHlwZSA9PT0gXCJDb3B5XCIpIHtcclxuXHRcdFx0XHRsZXQgbmV3TWF0ZXJpYWwgPSBsaW5lVGV4dDtcclxuXHRcdFx0XHR0aGlzLnNhdmVUb1dvcmtiZW5jaChuZXdNYXRlcmlhbCwgXCJhIGNvcHkgb2YgdGhlIHNlbGVjdGVkIGxpbmUvYmxvY2tcIik7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0bGV0IGxpbmtQcmVmaXggPSBcIlwiO1xyXG5cclxuXHRcdFx0XHRpZiAoY2xpY2tUeXBlID09PSBcIkVtYmVkXCIpIHtcclxuXHRcdFx0XHRcdGxpbmtQcmVmaXggPSBcIiFcIjtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGNvbnNvbGUubG9nKFwiQ2hlY2tpbmcgZm9yIGJsb2NrOlwiKTtcclxuXHRcdFx0XHRpZiAodGhpcy5nZXRCbG9jayhsaW5lVGV4dCwgY3VycmVudE5vdGVGaWxlKSA9PT0gXCJcIikgeyAvLyBUaGUgbGluZSBpcyBub3QgYWxyZWFkeSBhIGJsb2NrXHJcblx0XHRcdFx0XHRsaW5lVGV4dCA9IGxpbmVUZXh0LnRyaW0oKTtcclxuXHRcdFx0XHRcdGNvbnNvbGUubG9nKFwiVGhpcyBsaW5lIGlzIG5vdCBjdXJyZW50bHkgYSBibG9jay4gQWRkaW5nIGEgYmxvY2sgSUQuXCIpO1xyXG5cdFx0XHRcdFx0bGluZUJsb2NrSUQgPSB0aGlzLmNyZWF0ZUJsb2NrSGFzaChsaW5lVGV4dCkudG9TdHJpbmcoKTtcclxuXHRcdFx0XHRcdGxldCBsaW5lV2l0aEJsb2NrID0gbGluZVRleHQgKyBcIiBeXCIgKyBsaW5lQmxvY2tJRDtcclxuXHRcdFx0XHRcdG9ic2lkaWFuQXBwLnZhdWx0LnJlYWQoY3VycmVudE5vdGVGaWxlKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuXHRcdFx0XHRcdFx0bGV0IHByZXZpb3VzTm90ZVRleHQgPSByZXN1bHQ7XHJcblx0XHRcdFx0XHRcdGxldCBuZXdOb3RlVGV4dCA9IHByZXZpb3VzTm90ZVRleHQucmVwbGFjZShsaW5lVGV4dCwgbGluZVdpdGhCbG9jayk7XHJcblx0XHRcdFx0XHRcdG9ic2lkaWFuQXBwLnZhdWx0Lm1vZGlmeShjdXJyZW50Tm90ZUZpbGUsIG5ld05vdGVUZXh0KTtcclxuXHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdGxldCBsaW5lQmxvY2tJRCA9IHRoaXMuZ2V0QmxvY2sobGluZVRleHQsIGN1cnJlbnROb3RlRmlsZSk7XHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhsaW5lQmxvY2tJRCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHJcblx0XHRcdFx0bGV0IG5ld01hdGVyaWFsID0gbGlua1ByZWZpeCArIFwiW1tcIiArIG5vdGVMaW5rICsgXCIjXlwiICsgbGluZUJsb2NrSUQgKyBcIl1dXCI7XHJcblx0XHRcdFx0Y29uc29sZS5sb2cobmV3TWF0ZXJpYWwpO1xyXG5cdFx0XHRcdHRoaXMuc2F2ZVRvV29ya2JlbmNoKG5ld01hdGVyaWFsLCBcImEgbGluayB0byB0aGUgc2VsZWN0ZWQgbGluZS9ibG9ja1wiKTtcclxuXHRcdFx0fSBcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdG5ldyBOb3RpY2UoXCJUaGVyZSBpcyBub3RoaW5nIG9uIHRoZSBzZWxlY3RlZCBsaW5lLlwiKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGxpbmtOb3RlSW5Xb3JrYmVuY2goKSB7IC8vIFNhdmVzIGEgbGluayB0byB0aGUgY3VycmVudCBub3RlIHRvIHRoZSB3b3JrYmVuY2hcclxuXHRcdGxldCBvYnNpZGlhbkFwcCA9IHRoaXMuYXBwO1xyXG5cdFx0bGV0IGN1cnJlbnRWaWV3ID0gb2JzaWRpYW5BcHAud29ya3NwYWNlLmFjdGl2ZUxlYWYudmlldztcclxuXHRcdC8vIEdldCB0aGUgZmlsZSBhbmQgY3JlYXRlIGEgbGluayB0byBpdFxyXG5cdFx0bGV0IGN1cnJlbnROb3RlRmlsZSA9IG9ic2lkaWFuQXBwLndvcmtzcGFjZS5hY3RpdmVMZWFmLnZpZXcuZmlsZTtcclxuXHRcdGxldCBub3RlTGluayA9IG9ic2lkaWFuQXBwLm1ldGFkYXRhQ2FjaGUuZmlsZVRvTGlua3RleHQoY3VycmVudE5vdGVGaWxlLCBjdXJyZW50Tm90ZUZpbGUucGF0aCwgdHJ1ZSk7XHJcblx0XHRsZXQgZWRpdG9yID0gY3VycmVudFZpZXcuc291cmNlTW9kZS5jbUVkaXRvcjtcclxuXHRcdFxyXG5cdFx0bGV0IG5ld01hdGVyaWFsID0gXCJbW1wiICsgbm90ZUxpbmsgKyBcIl1dXCI7XHJcblx0XHRjb25zb2xlLmxvZyhuZXdNYXRlcmlhbCk7XHJcblx0XHR0aGlzLnNhdmVUb1dvcmtiZW5jaChuZXdNYXRlcmlhbCwgXCJhIGxpbmsgdG8gdGhlIGN1cnJlbnQgbm90ZVwiKTtcclxuXHR9XHJcblxyXG5cdGVtYmVkTm90ZUluV29ya2JlbmNoKCkgeyAvLyBTYXZlcyBhbiBlbWJlZCBvZiB0aGUgY3VycmVudCBub3RlIHRvIHRoZSB3b3JrYmVuY2hcclxuXHRcdGxldCBvYnNpZGlhbkFwcCA9IHRoaXMuYXBwO1xyXG5cdFx0Ly8gR2V0IHRoZSBmaWxlIGFuZCBjcmVhdGUgYSBsaW5rIHRvIGl0XHJcblx0XHRsZXQgY3VycmVudE5vdGVGaWxlID0gb2JzaWRpYW5BcHAud29ya3NwYWNlLmFjdGl2ZUxlYWYudmlldy5maWxlO1xyXG5cdFx0bGV0IG5vdGVMaW5rID0gb2JzaWRpYW5BcHAubWV0YWRhdGFDYWNoZS5maWxlVG9MaW5rdGV4dChjdXJyZW50Tm90ZUZpbGUsIGN1cnJlbnROb3RlRmlsZS5wYXRoLCB0cnVlKTtcclxuXHRcdFxyXG5cdFx0bGV0IG5ld01hdGVyaWFsID0gXCIhW1tcIiArIG5vdGVMaW5rICsgXCJdXVwiO1xyXG5cdFx0Y29uc29sZS5sb2cobmV3TWF0ZXJpYWwpO1xyXG5cdFx0dGhpcy5zYXZlVG9Xb3JrYmVuY2gobmV3TWF0ZXJpYWwsIFwiYW4gZW1iZWQgb2YgdGhlIGN1cnJlbnQgbm90ZVwiKTtcclxuXHR9XHJcblxyXG5cdGxpbmtTZWN0aW9uSW5Xb3JrYmVuY2goKSB7IC8vIFNhdmVzIGEgbGluayB0byB0aGUgY3VycmVudCBoZWFkaW5nIHRvIHRoZSB3b3JrYmVuY2hcclxuXHRcdGxldCBvYnNpZGlhbkFwcCA9IHRoaXMuYXBwO1xyXG5cclxuXHRcdC8vIGdldCB0aGUgaGVhZGluZ1xyXG5cdFx0bGV0IGN1cnJlbnRWaWV3ID0gb2JzaWRpYW5BcHAud29ya3NwYWNlLmFjdGl2ZUxlYWYudmlldztcclxuXHRcdGxldCBjdXJyZW50Tm90ZUZpbGUgPSBjdXJyZW50Vmlldy5maWxlO1xyXG5cdFx0bGV0IGVkaXRvciA9IGN1cnJlbnRWaWV3LnNvdXJjZU1vZGUuY21FZGl0b3I7XHJcblx0XHR2YXIgY3Vyc29yID0gZWRpdG9yLmdldEN1cnNvcigpO1xyXG5cdFxyXG5cdFx0bGV0IGN1cnJlbnRMaW5lID0gZWRpdG9yLmRvYy5zZWwucmFuZ2VzWzBdLmFuY2hvci5saW5lO1xyXG5cclxuXHRcdC8vIFN0dWNrIGhlcmUuIEZvciBzb21lIHJlYXNvbiB0aGUgYWN0aW9uIG9ubHkgd29ya3Mgb25jZSBvbiBzb21lIHNlY3Rpb25zIHRrdGt0a1xyXG5cclxuXHRcdGxldCBoZWFkaW5ncyA9IG9ic2lkaWFuQXBwLm1ldGFkYXRhQ2FjaGUuZ2V0RmlsZUNhY2hlKGN1cnJlbnROb3RlRmlsZSkuaGVhZGluZ3M7XHJcblx0XHRsZXQgc2VjdGlvbkhlYWRpbmc7XHJcblx0XHRjb25zb2xlLmxvZyhoZWFkaW5ncyk7XHJcblx0XHRpZiAoIWhlYWRpbmdzKSB7IFxyXG5cdFx0XHRuZXcgTm90aWNlKFwiTm8gaGVhZGluZ3MgZm91bmQgaW4gdGhlIGN1cnJlbnQgZG9jdW1lbnQuXCIpO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9IGVsc2UgeyAvLyBjaGVjayB3aGF0IGhlYWRpbmcgaXMgY2xvc2VzdCBhYm92ZSB0aGUgY3VycmVudCBsaW5lXHJcblx0XHRcdGZvciAobGV0IGVhY2hIZWFkaW5nIG9mIGhlYWRpbmdzKSB7XHJcblx0XHRcdFx0bGV0IGhlYWRpbmdMaW5lTnVtYmVyID0gZWFjaEhlYWRpbmcucG9zaXRpb24uc3RhcnQubGluZTtcclxuXHRcdFx0XHRpZiAoaGVhZGluZ0xpbmVOdW1iZXIgPT0gY3VycmVudExpbmUpIHtcclxuXHRcdFx0XHRcdHNlY3Rpb25IZWFkaW5nID0gZWFjaEhlYWRpbmc7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHR9IGVsc2UgaWYgKGhlYWRpbmdMaW5lTnVtYmVyID4gY3VycmVudExpbmUpIHtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0c2VjdGlvbkhlYWRpbmcgPSBlYWNoSGVhZGluZztcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdFxyXG5cdFx0bGV0IG5vdGVMaW5rID0gb2JzaWRpYW5BcHAubWV0YWRhdGFDYWNoZS5maWxlVG9MaW5rdGV4dChjdXJyZW50Tm90ZUZpbGUsIGN1cnJlbnROb3RlRmlsZS5wYXRoLCB0cnVlKTtcclxuXHJcblx0XHRsZXQgbmV3TWF0ZXJpYWwgPSBcIltbXCIgKyBub3RlTGluayArIFwiI1wiICsgc2VjdGlvbkhlYWRpbmcuaGVhZGluZyArIFwiXV1cIjtcclxuXHRcdGNvbnNvbGUubG9nKG5ld01hdGVyaWFsKTtcclxuXHRcdHRoaXMuc2F2ZVRvV29ya2JlbmNoKG5ld01hdGVyaWFsLCBcImEgbGluayB0byB0aGUgY3VycmVudCBzZWN0aW9uXCIpO1xyXG5cdH1cclxuXHJcblx0ZW1iZWRTZWN0aW9uSW5Xb3JrYmVuY2goKSB7IC8vIFNhdmVzIGFuIGVtYmVkIG9mIHRoZSBjdXJyZW50IGhlYWRpbmcgdG8gdGhlIHdvcmtiZW5jaFxyXG5cdFx0bGV0IG9ic2lkaWFuQXBwID0gdGhpcy5hcHA7XHJcblxyXG5cdFx0Ly8gZ2V0IHRoZSBoZWFkaW5nXHJcblx0XHRsZXQgY3VycmVudFZpZXcgPSBvYnNpZGlhbkFwcC53b3Jrc3BhY2UuYWN0aXZlTGVhZi52aWV3O1xyXG5cdFx0bGV0IGN1cnJlbnROb3RlRmlsZSA9IGN1cnJlbnRWaWV3LmZpbGU7XHJcblx0XHRsZXQgZWRpdG9yID0gY3VycmVudFZpZXcuc291cmNlTW9kZS5jbUVkaXRvcjtcclxuXHRcdHZhciBjdXJzb3IgPSBlZGl0b3IuZ2V0Q3Vyc29yKCk7XHJcblx0XHJcblx0XHRsZXQgY3VycmVudExpbmUgPSBlZGl0b3IuZG9jLnNlbC5yYW5nZXNbMF0uYW5jaG9yLmxpbmU7XHJcblxyXG5cdFx0Ly8gU3R1Y2sgaGVyZS4gRm9yIHNvbWUgcmVhc29uIHRoZSBhY3Rpb24gb25seSB3b3JrcyBvbmNlIG9uIHNvbWUgc2VjdGlvbnMgdGt0a3RrXHJcblxyXG5cdFx0bGV0IGhlYWRpbmdzID0gb2JzaWRpYW5BcHAubWV0YWRhdGFDYWNoZS5nZXRGaWxlQ2FjaGUoY3VycmVudE5vdGVGaWxlKS5oZWFkaW5ncztcclxuXHRcdGxldCBzZWN0aW9uSGVhZGluZztcclxuXHRcdGNvbnNvbGUubG9nKGhlYWRpbmdzKTtcclxuXHRcdGlmICghaGVhZGluZ3MpIHsgXHJcblx0XHRcdG5ldyBOb3RpY2UoXCJObyBoZWFkaW5ncyBmb3VuZCBpbiB0aGUgY3VycmVudCBkb2N1bWVudC5cIik7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH0gZWxzZSB7IC8vIGNoZWNrIHdoYXQgaGVhZGluZyBpcyBjbG9zZXN0IGFib3ZlIHRoZSBjdXJyZW50IGxpbmVcclxuXHRcdFx0Zm9yIChsZXQgZWFjaEhlYWRpbmcgb2YgaGVhZGluZ3MpIHtcclxuXHRcdFx0XHRsZXQgaGVhZGluZ0xpbmVOdW1iZXIgPSBlYWNoSGVhZGluZy5wb3NpdGlvbi5zdGFydC5saW5lO1xyXG5cdFx0XHRcdGlmIChoZWFkaW5nTGluZU51bWJlciA9PSBjdXJyZW50TGluZSkge1xyXG5cdFx0XHRcdFx0c2VjdGlvbkhlYWRpbmcgPSBlYWNoSGVhZGluZztcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdH0gZWxzZSBpZiAoaGVhZGluZ0xpbmVOdW1iZXIgPiBjdXJyZW50TGluZSkge1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRzZWN0aW9uSGVhZGluZyA9IGVhY2hIZWFkaW5nO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0XHJcblx0XHRsZXQgbm90ZUxpbmsgPSBvYnNpZGlhbkFwcC5tZXRhZGF0YUNhY2hlLmZpbGVUb0xpbmt0ZXh0KGN1cnJlbnROb3RlRmlsZSwgY3VycmVudE5vdGVGaWxlLnBhdGgsIHRydWUpO1xyXG5cclxuXHRcdGxldCBuZXdNYXRlcmlhbCA9IFwiIVtbXCIgKyBub3RlTGluayArIFwiI1wiICsgc2VjdGlvbkhlYWRpbmcuaGVhZGluZyArIFwiXV1cIjtcclxuXHRcdGNvbnNvbGUubG9nKG5ld01hdGVyaWFsKTtcclxuXHRcdHRoaXMuc2F2ZVRvV29ya2JlbmNoKG5ld01hdGVyaWFsLCBcImEgbGluayB0byB0aGUgY3VycmVudCBzZWN0aW9uXCIpO1xyXG5cdH1cclxuXHJcblx0bGlua0Jsb2NrSW5Xb3JrYmVuY2goKSB7IC8vIExpbmtzIHRoZSBjdXJyZW50IGJsb2NrIHRvIHRoZSB3b3JrYmVuY2hcclxuXHRcdGxldCBvYnNpZGlhbkFwcCA9IHRoaXMuYXBwO1xyXG5cclxuXHRcdC8vIGdldCB0aGUgYmxvY2tcclxuXHRcdGxldCBjdXJyZW50VmlldyA9IG9ic2lkaWFuQXBwLndvcmtzcGFjZS5hY3RpdmVMZWFmLnZpZXc7XHJcblx0XHRsZXQgY3VycmVudE5vdGVGaWxlID0gY3VycmVudFZpZXcuZmlsZTtcclxuXHRcdGxldCBlZGl0b3IgPSBjdXJyZW50Vmlldy5zb3VyY2VNb2RlLmNtRWRpdG9yO1xyXG5cdFx0dmFyIGN1cnNvciA9IGVkaXRvci5nZXRDdXJzb3IoKTtcclxuXHRcdGxldCBsaW5lVGV4dCA9IGVkaXRvci5nZXRMaW5lKGN1cnNvci5saW5lKTtcclxuXHRcdGNvbnNvbGUubG9nKGxpbmVUZXh0KTtcclxuXHJcblx0XHRjb25zb2xlLmxvZyhcIkNoZWNraW5nIGZvciBibG9jazpcIik7XHJcblx0XHRsZXQgbGluZUJsb2NrSUQgPSB0aGlzLmdldEJsb2NrKGxpbmVUZXh0LCBjdXJyZW50Tm90ZUZpbGUpO1xyXG5cdFx0Y29uc29sZS5sb2cobGluZUJsb2NrSUQpO1xyXG5cclxuXHRcdGlmICh0aGlzLmdldEJsb2NrKGxpbmVUZXh0LCBjdXJyZW50Tm90ZUZpbGUpID09PSBcIlwiKSB7IC8vIFRoZSBsaW5lIGlzIG5vdCBhbHJlYWR5IGEgYmxvY2tcclxuXHRcdFx0Y29uc29sZS5sb2coXCJUaGlzIGxpbmUgaXMgbm90IGN1cnJlbnRseSBhIGJsb2NrLiBBZGRpbmcgYSBibG9jayBJRC5cIik7XHJcblx0XHRcdGxpbmVCbG9ja0lEID0gdGhpcy5jcmVhdGVCbG9ja0hhc2gobGluZVRleHQpLnRvU3RyaW5nKCk7XHJcblx0XHRcdGxldCBsaW5lV2l0aEJsb2NrID0gbGluZVRleHQgKyBcIiBeXCIgKyBsaW5lQmxvY2tJRDtcclxuXHRcdFx0b2JzaWRpYW5BcHAudmF1bHQucmVhZChjdXJyZW50Tm90ZUZpbGUpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG5cdFx0XHRcdGxldCBwcmV2aW91c05vdGVUZXh0ID0gcmVzdWx0O1xyXG5cdFx0XHRcdGxldCBuZXdOb3RlVGV4dCA9IHByZXZpb3VzTm90ZVRleHQucmVwbGFjZShsaW5lVGV4dCwgbGluZVdpdGhCbG9jayk7XHJcblx0XHRcdFx0b2JzaWRpYW5BcHAudmF1bHQubW9kaWZ5KGN1cnJlbnROb3RlRmlsZSwgbmV3Tm90ZVRleHQpO1xyXG5cdFx0XHR9KVxyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBub3RlTGluayA9IG9ic2lkaWFuQXBwLm1ldGFkYXRhQ2FjaGUuZmlsZVRvTGlua3RleHQoY3VycmVudE5vdGVGaWxlLCBjdXJyZW50Tm90ZUZpbGUucGF0aCwgdHJ1ZSk7XHJcblxyXG5cdFx0bGV0IG5ld01hdGVyaWFsID0gXCJbW1wiICsgbm90ZUxpbmsgKyBcIiNeXCIgKyBsaW5lQmxvY2tJRCArIFwiXV1cIjtcclxuXHRcdGNvbnNvbGUubG9nKG5ld01hdGVyaWFsKTtcclxuXHRcdHRoaXMuc2F2ZVRvV29ya2JlbmNoKG5ld01hdGVyaWFsLCBcImEgbGluayB0byB0aGUgY3VycmVudCBibG9ja1wiKTtcclxuXHR9XHJcblxyXG5cdGVtYmVkQmxvY2tJbldvcmtiZW5jaCgpIHsgLy8gU2F2ZXMgYW4gZW1iZWQgb2YgdGhlIGN1cnJlbnQgYmxvY2sgdG8gdGhlIHdvcmtiZW5jaFxyXG5cdFx0bGV0IG9ic2lkaWFuQXBwID0gdGhpcy5hcHA7XHJcblxyXG5cdFx0Ly8gZ2V0IHRoZSBibG9ja1xyXG5cdFx0bGV0IGN1cnJlbnRWaWV3ID0gb2JzaWRpYW5BcHAud29ya3NwYWNlLmFjdGl2ZUxlYWYudmlldztcclxuXHRcdGxldCBjdXJyZW50Tm90ZUZpbGUgPSBjdXJyZW50Vmlldy5maWxlO1xyXG5cdFx0bGV0IGVkaXRvciA9IGN1cnJlbnRWaWV3LnNvdXJjZU1vZGUuY21FZGl0b3I7XHJcblx0XHR2YXIgY3Vyc29yID0gZWRpdG9yLmdldEN1cnNvcigpO1xyXG5cdFx0bGV0IGxpbmVUZXh0ID0gZWRpdG9yLmdldExpbmUoY3Vyc29yLmxpbmUpO1xyXG5cdFx0Y29uc29sZS5sb2cobGluZVRleHQpO1xyXG5cclxuXHRcdGNvbnNvbGUubG9nKFwiQ2hlY2tpbmcgZm9yIGJsb2NrOlwiKTtcclxuXHRcdGxldCBsaW5lQmxvY2tJRCA9IHRoaXMuZ2V0QmxvY2sobGluZVRleHQsIGN1cnJlbnROb3RlRmlsZSk7XHJcblx0XHRjb25zb2xlLmxvZyhsaW5lQmxvY2tJRCk7XHJcblxyXG5cdFx0aWYgKHRoaXMuZ2V0QmxvY2sobGluZVRleHQsIGN1cnJlbnROb3RlRmlsZSkgPT09IFwiXCIpIHsgLy8gVGhlIGxpbmUgaXMgbm90IGFscmVhZHkgYSBibG9ja1xyXG5cdFx0XHRjb25zb2xlLmxvZyhcIlRoaXMgbGluZSBpcyBub3QgY3VycmVudGx5IGEgYmxvY2suIEFkZGluZyBhIGJsb2NrIElELlwiKTtcclxuXHRcdFx0bGluZUJsb2NrSUQgPSB0aGlzLmNyZWF0ZUJsb2NrSGFzaChsaW5lVGV4dCkudG9TdHJpbmcoKTtcclxuXHRcdFx0bGV0IGxpbmVXaXRoQmxvY2sgPSBsaW5lVGV4dCArIFwiIF5cIiArIGxpbmVCbG9ja0lEO1xyXG5cdFx0XHRvYnNpZGlhbkFwcC52YXVsdC5yZWFkKGN1cnJlbnROb3RlRmlsZSkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcblx0XHRcdFx0bGV0IHByZXZpb3VzTm90ZVRleHQgPSByZXN1bHQ7XHJcblx0XHRcdFx0bGV0IG5ld05vdGVUZXh0ID0gcHJldmlvdXNOb3RlVGV4dC5yZXBsYWNlKGxpbmVUZXh0LCBsaW5lV2l0aEJsb2NrKTtcclxuXHRcdFx0XHRvYnNpZGlhbkFwcC52YXVsdC5tb2RpZnkoY3VycmVudE5vdGVGaWxlLCBuZXdOb3RlVGV4dCk7XHJcblx0XHRcdH0pXHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IG5vdGVMaW5rID0gb2JzaWRpYW5BcHAubWV0YWRhdGFDYWNoZS5maWxlVG9MaW5rdGV4dChjdXJyZW50Tm90ZUZpbGUsIGN1cnJlbnROb3RlRmlsZS5wYXRoLCB0cnVlKTtcclxuXHJcblx0XHRsZXQgbmV3TWF0ZXJpYWwgPSBcIiFbW1wiICsgbm90ZUxpbmsgKyBcIiNeXCIgKyBsaW5lQmxvY2tJRCArIFwiXV1cIjtcclxuXHRcdGNvbnNvbGUubG9nKG5ld01hdGVyaWFsKTtcclxuXHRcdHRoaXMuc2F2ZVRvV29ya2JlbmNoKG5ld01hdGVyaWFsLCBcImEgbGluayB0byB0aGUgY3VycmVudCBibG9ja1wiKTtcclxuXHR9XHJcblxyXG5cdGNvcHlCbG9ja0ludG9Xb3JrYmVuY2goKSB7IC8vIENvcGllcyB0aGUgY29udGVudCBvZiB0aGUgY3VycmVudCBibG9jayB0byB0aGUgd29ya2JlbmNoXHJcblx0XHRsZXQgb2JzaWRpYW5BcHAgPSB0aGlzLmFwcDtcclxuXHJcblx0XHRsZXQgY3VycmVudFZpZXcgPSBvYnNpZGlhbkFwcC53b3Jrc3BhY2UuYWN0aXZlTGVhZi52aWV3O1xyXG5cdFx0bGV0IGVkaXRvciA9IGN1cnJlbnRWaWV3LnNvdXJjZU1vZGUuY21FZGl0b3I7XHJcblx0XHR2YXIgY3Vyc29yID0gZWRpdG9yLmdldEN1cnNvcigpO1xyXG5cdFx0bGV0IGxpbmVUZXh0ID0gZWRpdG9yLmdldExpbmUoY3Vyc29yLmxpbmUpO1xyXG5cdFx0Y29uc29sZS5sb2cobGluZVRleHQpO1xyXG5cclxuXHRcdGxldCBuZXdNYXRlcmlhbCA9IGxpbmVUZXh0O1xyXG5cdFx0Y29uc29sZS5sb2cobmV3TWF0ZXJpYWwpO1xyXG5cdFx0dGhpcy5zYXZlVG9Xb3JrYmVuY2gobmV3TWF0ZXJpYWwsIFwiYSBjb3B5IG9mIHRoZSBjdXJyZW50IGJsb2NrXCIpO1xyXG5cdH1cclxuXHJcblx0Y29weUxpbmVBbmRMaW5rVG9CbG9jaygpIHsgLy8gQ29waWVzIHRoZSBjb250ZW50IG9mIHRoZSBjdXJyZW50IGJsb2NrIHRvIHRoZSB3b3JrYmVuY2hcclxuXHRcdGxldCBvYnNpZGlhbkFwcCA9IHRoaXMuYXBwO1xyXG5cclxuXHRcdGxldCBjdXJyZW50VmlldyA9IG9ic2lkaWFuQXBwLndvcmtzcGFjZS5hY3RpdmVMZWFmLnZpZXc7XHJcblx0XHRsZXQgY3VycmVudE5vdGVGaWxlID0gY3VycmVudFZpZXcuZmlsZTtcclxuXHRcdGxldCBlZGl0b3IgPSBjdXJyZW50Vmlldy5zb3VyY2VNb2RlLmNtRWRpdG9yO1xyXG5cdFx0dmFyIGN1cnNvciA9IGVkaXRvci5nZXRDdXJzb3IoKTtcclxuXHRcdGxldCBsaW5lVGV4dCA9IGVkaXRvci5nZXRMaW5lKGN1cnNvci5saW5lKTtcclxuXHRcdGNvbnNvbGUubG9nKGxpbmVUZXh0KTtcclxuXHJcblx0XHQvL3RyaW0gYmxvY2sgdGV4dCB0a3RrdGtcclxuXHJcblx0XHRsZXQgYmxvY2tJRFJlZ2V4ID0gbmV3IFJlZ0V4cChcIi8oXFxzKXswLDF9W1xcXl17MX0oW2EtekEtWjAtOVxcLV0rKSQvXCIsIFwiZ2ltXCIpO1xyXG5cclxuXHRcdGxldCBsaW5lVGV4dFdpdGhvdXRCbG9ja0lEID0gbGluZVRleHQucmVwbGFjZShibG9ja0lEUmVnZXgsIFwiXCIpO1xyXG5cclxuXHRcdGNvbnNvbGUubG9nKFwiQ2hlY2tpbmcgZm9yIGJsb2NrOlwiKTtcclxuXHRcdGxldCBsaW5lQmxvY2tJRCA9IHRoaXMuZ2V0QmxvY2sobGluZVRleHQsIGN1cnJlbnROb3RlRmlsZSk7XHJcblx0XHRjb25zb2xlLmxvZyhsaW5lQmxvY2tJRCk7XHJcblxyXG5cdFx0aWYgKHRoaXMuZ2V0QmxvY2sobGluZVRleHQsIGN1cnJlbnROb3RlRmlsZSkgPT09IFwiXCIpIHsgLy8gVGhlIGxpbmUgaXMgbm90IGFscmVhZHkgYSBibG9ja1xyXG5cdFx0XHRjb25zb2xlLmxvZyhcIlRoaXMgbGluZSBpcyBub3QgY3VycmVudGx5IGEgYmxvY2suIEFkZGluZyBhIGJsb2NrIElELlwiKTtcclxuXHRcdFx0bGluZUJsb2NrSUQgPSB0aGlzLmNyZWF0ZUJsb2NrSGFzaChsaW5lVGV4dCkudG9TdHJpbmcoKTtcclxuXHRcdFx0bGV0IGxpbmVXaXRoQmxvY2sgPSBsaW5lVGV4dCArIFwiIF5cIiArIGxpbmVCbG9ja0lEO1xyXG5cdFx0XHRvYnNpZGlhbkFwcC52YXVsdC5yZWFkKGN1cnJlbnROb3RlRmlsZSkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcblx0XHRcdFx0bGV0IHByZXZpb3VzTm90ZVRleHQgPSByZXN1bHQ7XHJcblx0XHRcdFx0bGV0IG5ld05vdGVUZXh0ID0gcHJldmlvdXNOb3RlVGV4dC5yZXBsYWNlKGxpbmVUZXh0LCBsaW5lV2l0aEJsb2NrKTtcclxuXHRcdFx0XHRvYnNpZGlhbkFwcC52YXVsdC5tb2RpZnkoY3VycmVudE5vdGVGaWxlLCBuZXdOb3RlVGV4dCk7XHJcblx0XHRcdH0pXHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IG5vdGVMaW5rID0gb2JzaWRpYW5BcHAubWV0YWRhdGFDYWNoZS5maWxlVG9MaW5rdGV4dChjdXJyZW50Tm90ZUZpbGUsIGN1cnJlbnROb3RlRmlsZS5wYXRoLCB0cnVlKTtcclxuXHJcblx0XHRsZXQgZW5jb2RlZE5vdGVMaW5rID0gZW5jb2RlVVJJQ29tcG9uZW50KG5vdGVMaW5rKTtcclxuXHJcblx0XHRsZXQgbmV3TWF0ZXJpYWwgPSBcIltcIiArIGxpbmVUZXh0V2l0aG91dEJsb2NrSUQgKyBcIl1cIiArIFwiKFwiICsgZW5jb2RlZE5vdGVMaW5rICsgXCIjXlwiICsgbGluZUJsb2NrSUQgKyBcIilcIjtcclxuXHRcdGNvbnNvbGUubG9nKG5ld01hdGVyaWFsKTtcclxuXHRcdHRoaXMuc2F2ZVRvV29ya2JlbmNoKG5ld01hdGVyaWFsLCBcImEgbGlua2VkIGNvcHkgb2YgdGhlIGN1cnJlbnQgYmxvY2tcIik7XHJcblx0fVxyXG5cclxufVxyXG5cclxuY2xhc3MgV29ya2JlbmNoU2V0dGluZ3Mge1xyXG5cdHdvcmtiZW5jaE5vdGVOYW1lID0gXCJXb3JrYmVuY2hcIjtcclxuXHR3b3JrYmVuY2hMaW5lUHJlZml4ID0gXCJcIjtcclxuXHRhbHRDbGlja1R5cGUgPSBcIkxpbmtcIjtcclxuXHRtZXRhQWx0Q2xpY2tUeXBlID0gXCJFbWJlZFwiO1xyXG5cdGluY2x1ZGVCbGFua0xpbmUgPSBmYWxzZTtcclxufVxyXG5cclxuY2xhc3MgV29ya2JlbmNoU2V0dGluZ1RhYiBleHRlbmRzIFBsdWdpblNldHRpbmdUYWIge1xyXG5cdGRpc3BsYXkoKTogdm9pZCB7XHJcblx0XHRsZXQge2NvbnRhaW5lckVsfSA9IHRoaXM7XHJcblx0XHRjb25zdCBwbHVnaW46IGFueSA9ICh0aGlzIGFzIGFueSkucGx1Z2luO1xyXG5cclxuXHRcdGNvbnRhaW5lckVsLmVtcHR5KCk7XHJcblxyXG5cdFx0Y29udGFpbmVyRWwuY3JlYXRlRWwoJ2gyJywge3RleHQ6ICdXb3JrYmVuY2ggU2V0dGluZ3MnfSk7XHJcblxyXG5cdFx0bmV3IFNldHRpbmcoY29udGFpbmVyRWwpXHJcblx0XHRcdC5zZXROYW1lKCdXb3JrYmVuY2ggbm90ZSBuYW1lJylcclxuXHRcdFx0LnNldERlc2MoJ1Byb3ZpZGUgYSB0aXRsZSBmb3IgdGhlIHdvcmtiZW5jaCBub3RlLiBEZWZhdWx0IGlzIFdvcmtiZW5jaC4nKVxyXG5cdFx0XHQuYWRkVGV4dCh0ZXh0ID0+IFxyXG5cdFx0XHRcdHRleHRcclxuXHRcdFx0XHRcdC5zZXRQbGFjZWhvbGRlcignV29ya2JlbmNoJylcclxuXHRcdFx0XHRcdC5zZXRWYWx1ZShwbHVnaW4uc2V0dGluZ3Mud29ya2JlbmNoTm90ZU5hbWUpXHJcblx0XHRcdFx0XHQub25DaGFuZ2UoKHZhbHVlKSA9PiB7XHJcblx0XHRcdFx0XHRcdHBsdWdpbi5zZXR0aW5ncy53b3JrYmVuY2hOb3RlTmFtZSA9IHZhbHVlO1xyXG5cdFx0XHRcdFx0XHRwbHVnaW4uc2F2ZURhdGEocGx1Z2luLnNldHRpbmdzKTtcclxuXHRcdFx0XHR9KSk7XHJcblxyXG5cdFx0bmV3IFNldHRpbmcoY29udGFpbmVyRWwpXHJcblx0XHRcdC5zZXROYW1lKCdXb3JrYmVuY2ggbGluZSBwcmVmaXgnKVxyXG5cdFx0XHQuc2V0RGVzYygnU2V0IHRoZSBwcmVmaXggdG8gZWFjaCBsaW5lIGFkZGVkIHRvIFdvcmtiZW5jaC4gRGVmYXVsdCBpcyBub3RoaW5nLicpXHJcblx0XHRcdC5hZGRUZXh0KHRleHQgPT4gXHJcblx0XHRcdFx0dGV4dFxyXG5cdFx0XHRcdFx0LnNldFBsYWNlaG9sZGVyKCcnKVxyXG5cdFx0XHRcdFx0LnNldFZhbHVlKHBsdWdpbi5zZXR0aW5ncy53b3JrYmVuY2hMaW5lUHJlZml4KVxyXG5cdFx0XHRcdFx0Lm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xyXG5cdFx0XHRcdFx0XHRwbHVnaW4uc2V0dGluZ3Mud29ya2JlbmNoTGluZVByZWZpeCA9IHZhbHVlO1xyXG5cdFx0XHRcdFx0XHRwbHVnaW4uc2F2ZURhdGEocGx1Z2luLnNldHRpbmdzKTtcclxuXHRcdFx0XHR9KSk7XHJcblx0XHRcclxuXHRcdG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxyXG5cdFx0XHQuc2V0TmFtZSgnQmxhbmsgbGluZXMnKVxyXG5cdFx0XHQuc2V0RGVzYygnVG9nZ2xlIHdoZXRoZXIgdGhlcmUgc2hvdWxkIGJlIGEgYmxhbmsgbGluZSBiZXR3ZWVuIGVhY2ggV29ya2JlbmNoIGVudHJ5LicpXHJcblx0XHRcdC5hZGRUb2dnbGUoKHRvZ2dsZSkgPT4ge1xyXG5cdFx0XHRcdHRvZ2dsZS5zZXRWYWx1ZShwbHVnaW4uc2V0dGluZ3MuaW5jbHVkZUJsYW5rTGluZSk7XHJcblx0XHRcdFx0dG9nZ2xlLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xyXG5cdFx0XHRcdFx0cGx1Z2luLnNldHRpbmdzLmluY2x1ZGVCbGFua0xpbmUgPSB2YWx1ZTtcclxuXHRcdFx0XHRcdGNvbnNvbGUubG9nKFwiSW5jbHVkZSBibGFuayBsaW5lcyBiZXR3ZWVuIGVudHJpZXM6XCIgKyB2YWx1ZSk7XHJcblx0XHRcdFx0ICBcdHBsdWdpbi5zYXZlRGF0YShwbHVnaW4uc2V0dGluZ3MpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRuZXcgU2V0dGluZyhjb250YWluZXJFbClcclxuXHRcdFx0LnNldE5hbWUoJ0FsdCtDbGljayB0eXBlJylcclxuXHRcdFx0LnNldERlc2MoJ1NldCB3aGF0IGhhcHBlbnMgd2hlbiB5b3UgYWx0K2NsaWNrIG9uIGEgbGluay4gRGVmYXVsdCBpcyB0byBjb3B5IHRoZSBsaW5rIGludG8gdGhlIFdvcmtiZW5jaC4gTm90ZTogaWYgeW91ciBjdXJzb3IgaXMgbm90IGFscmVhZHkgb24gdGhlIHRhcmdldGVkIGxpbmUsIHlvdSBtYXkgbmVlZCB0byBkb3VibGUtY2xpY2shJylcclxuXHRcdFx0LmFkZERyb3Bkb3duKGRyb3BEb3duID0+XHJcblx0XHRcdFx0ZHJvcERvd25cclxuXHRcdFx0XHRcdC5hZGRPcHRpb24oXCJMaW5rXCIsIFwiTGluayBzZWxlY3RlZCBub3RlIGluIFdvcmtiZW5jaFwiKVxyXG5cdFx0XHRcdFx0LmFkZE9wdGlvbihcIkVtYmVkXCIsIFwiRW1iZWQgc2VsZWN0ZWQgbm90ZSBpbiBXb3JrYmVuY2hcIilcclxuXHRcdFx0XHRcdC5hZGRPcHRpb24oXCJOb3RoaW5nXCIsIFwiTm90aGluZ1wiKVxyXG5cdFx0XHRcdFx0LnNldFZhbHVlKHBsdWdpbi5zZXR0aW5ncy5hbHRDbGlja1R5cGUpXHJcblx0XHRcdFx0XHQub25DaGFuZ2UoKHZhbHVlOiBzdHJpbmcpID0+IHtcclxuXHRcdFx0XHRcdFx0cGx1Z2luLnNldHRpbmdzLmFsdENsaWNrVHlwZSA9IHZhbHVlO1xyXG5cdFx0XHRcdFx0XHRwbHVnaW4uc2F2ZURhdGEocGx1Z2luLnNldHRpbmdzKTtcclxuXHRcdFx0XHRcdFx0dGhpcy5kaXNwbGF5KCk7XHJcblx0XHRcdFx0fSkpO1xyXG5cdFx0XHRcclxuXHRcdG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxyXG5cdFx0XHQuc2V0TmFtZSgnTWV0YStBbHQrQ2xpY2sgdHlwZScpXHJcblx0XHRcdC5zZXREZXNjKCdTZXQgd2hhdCBoYXBwZW5zIHdoZW4geW91IGNtZC9jdHJsK2FsdCtjbGljayBvbiBhIGxpbmUuIERlZmF1bHQgaXMgdG8gbGluayB0aGUgbGluZSBhcyBhIGJsb2NrIGludG8gdGhlIFdvcmtiZW5jaC4gTm90ZTogaWYgeW91ciBjdXJzb3IgaXMgbm90IGFscmVhZHkgb24gdGhlIHRhcmdldGVkIGxpbmUsIHlvdSBtYXkgbmVlZCB0byBkb3VibGUtY2xpY2shJylcclxuXHRcdFx0LmFkZERyb3Bkb3duKGRyb3BEb3duID0+XHJcblx0XHRcdFx0ZHJvcERvd25cclxuXHRcdFx0XHRcdC5hZGRPcHRpb24oXCJMaW5rXCIsIFwiTGluayBibG9ja1wiKVxyXG5cdFx0XHRcdFx0LmFkZE9wdGlvbihcIkVtYmVkXCIsIFwiRW1iZWQgYmxvY2tcIilcclxuXHRcdFx0XHRcdC5hZGRPcHRpb24oXCJDb3B5XCIsIFwiQ29weSBsaW5lXCIpXHJcblx0XHRcdFx0XHQuYWRkT3B0aW9uKFwiTm90aGluZ1wiLCBcIk5vdGhpbmdcIilcclxuXHRcdFx0XHRcdC5zZXRWYWx1ZShwbHVnaW4uc2V0dGluZ3MubWV0YUFsdENsaWNrVHlwZSlcclxuXHRcdFx0XHRcdC5vbkNoYW5nZSgodmFsdWU6IHN0cmluZykgPT4ge1xyXG5cdFx0XHRcdFx0XHRwbHVnaW4uc2V0dGluZ3MubWV0YUFsdENsaWNrVHlwZSA9IHZhbHVlO1xyXG5cdFx0XHRcdFx0XHRwbHVnaW4uc2F2ZURhdGEocGx1Z2luLnNldHRpbmdzKTtcclxuXHRcdFx0XHRcdFx0dGhpcy5kaXNwbGF5KCk7XHJcblx0XHRcdFx0fSkpO1xyXG5cdH1cclxufVxyXG4iXSwibmFtZXMiOlsiTWFya2Rvd25QcmV2aWV3VmlldyIsIk5vdGljZSIsIlBsdWdpbiIsIlNldHRpbmciLCJQbHVnaW5TZXR0aW5nVGFiIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLGFBQWEsR0FBRyxTQUFTLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDbkMsSUFBSSxhQUFhLEdBQUcsTUFBTSxDQUFDLGNBQWM7QUFDekMsU0FBUyxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsWUFBWSxLQUFLLElBQUksVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQ3BGLFFBQVEsVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQzFHLElBQUksT0FBTyxhQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQy9CLENBQUMsQ0FBQztBQUNGO0FBQ08sU0FBUyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUNoQyxJQUFJLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDeEIsSUFBSSxTQUFTLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLEVBQUU7QUFDM0MsSUFBSSxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsS0FBSyxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ3pGLENBQUM7QUF1Q0Q7QUFDTyxTQUFTLFNBQVMsQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUU7QUFDN0QsSUFBSSxTQUFTLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxPQUFPLEtBQUssWUFBWSxDQUFDLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLFVBQVUsT0FBTyxFQUFFLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUU7QUFDaEgsSUFBSSxPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxPQUFPLENBQUMsRUFBRSxVQUFVLE9BQU8sRUFBRSxNQUFNLEVBQUU7QUFDL0QsUUFBUSxTQUFTLFNBQVMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO0FBQ25HLFFBQVEsU0FBUyxRQUFRLENBQUMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO0FBQ3RHLFFBQVEsU0FBUyxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUUsTUFBTSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQyxFQUFFO0FBQ3RILFFBQVEsSUFBSSxDQUFDLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLFVBQVUsSUFBSSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQzlFLEtBQUssQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQUNEO0FBQ08sU0FBUyxXQUFXLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRTtBQUMzQyxJQUFJLElBQUksQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDckgsSUFBSSxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsT0FBTyxNQUFNLEtBQUssVUFBVSxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsV0FBVyxFQUFFLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUM3SixJQUFJLFNBQVMsSUFBSSxDQUFDLENBQUMsRUFBRSxFQUFFLE9BQU8sVUFBVSxDQUFDLEVBQUUsRUFBRSxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQ3RFLElBQUksU0FBUyxJQUFJLENBQUMsRUFBRSxFQUFFO0FBQ3RCLFFBQVEsSUFBSSxDQUFDLEVBQUUsTUFBTSxJQUFJLFNBQVMsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO0FBQ3RFLFFBQVEsT0FBTyxDQUFDLEVBQUUsSUFBSTtBQUN0QixZQUFZLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ3pLLFlBQVksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNwRCxZQUFZLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUN6QixnQkFBZ0IsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsTUFBTTtBQUM5QyxnQkFBZ0IsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDO0FBQ3hFLGdCQUFnQixLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTO0FBQ2pFLGdCQUFnQixLQUFLLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxTQUFTO0FBQ2pFLGdCQUFnQjtBQUNoQixvQkFBb0IsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRTtBQUNoSSxvQkFBb0IsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRTtBQUMxRyxvQkFBb0IsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFO0FBQ3pGLG9CQUFvQixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUU7QUFDdkYsb0JBQW9CLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDMUMsb0JBQW9CLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxTQUFTO0FBQzNDLGFBQWE7QUFDYixZQUFZLEVBQUUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQztBQUN2QyxTQUFTLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsU0FBUyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7QUFDbEUsUUFBUSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDO0FBQ3pGLEtBQUs7QUFDTDs7O0lDcEc2QyxtQ0FBTTtJQUFuRDs7S0E2bkJDO0lBMW5CTSxnQ0FBTSxHQUFaOzs7Ozs7O3dCQUNDLE9BQU8sQ0FBQyxHQUFHLENBQUMsK0JBQStCLENBQUMsQ0FBQzs7d0JBRzdDLEtBQUEsSUFBSSxDQUFBO3dCQUFhLHFCQUFNLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBQTs7O3dCQUF0QyxHQUFLLFFBQVEsR0FBRyxDQUFDLFNBQXFCLEtBQUssSUFBSSxpQkFBaUIsRUFBRSxDQUFDO3dCQUduRSxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxXQUFXLEVBQUU7NEJBQ3pDLElBQUksV0FBVyxHQUFHLEtBQUksQ0FBQyxHQUFHLENBQUM7NEJBQzNCLElBQUksa0JBQWtCLEdBQUcsS0FBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQzs0QkFFekQsSUFBSSxLQUFLLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQzs0QkFDeEMsSUFBTSxpQkFBaUIsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLElBQUksS0FBSyxrQkFBa0I7bUNBQ3JFLENBQUMsQ0FBQyxJQUFJLEtBQUssa0JBQWtCO21DQUM3QixDQUFDLENBQUMsUUFBUSxLQUFLLGtCQUFrQixHQUFBLENBQ3BDLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBRU4sV0FBVyxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsa0JBQWtCLEVBQUUsaUJBQWlCLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRUEsNEJBQW1CLENBQUMsQ0FBQzt5QkFDMUcsQ0FBQyxDQUFDO3dCQUVILElBQUksQ0FBQyxVQUFVLENBQUM7NEJBQ2YsRUFBRSxFQUFFLDZCQUE2Qjs0QkFDakMsSUFBSSxFQUFFLCtDQUErQzs7Ozs0QkFJckQsYUFBYSxFQUFFLFVBQUMsUUFBaUI7Z0NBQ2hDLElBQUksSUFBSSxHQUFHLEtBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQztnQ0FDekMsSUFBSSxJQUFJLEVBQUU7b0NBQ1QsSUFBSSxDQUFDLFFBQVEsRUFBRTt3Q0FDZCxLQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztxQ0FDM0I7b0NBQ0QsT0FBTyxJQUFJLENBQUM7aUNBQ1o7Z0NBQ0QsT0FBTyxLQUFLLENBQUM7NkJBQ2I7eUJBQ0QsQ0FBQyxDQUFDO3dCQUVILElBQUksQ0FBQyxVQUFVLENBQUM7NEJBQ2YsRUFBRSxFQUFFLDhCQUE4Qjs0QkFDbEMsSUFBSSxFQUFFLGdEQUFnRDs7Ozs0QkFJdEQsYUFBYSxFQUFFLFVBQUMsUUFBaUI7Z0NBQ2hDLElBQUksSUFBSSxHQUFHLEtBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQztnQ0FDekMsSUFBSSxJQUFJLEVBQUU7b0NBQ1QsSUFBSSxDQUFDLFFBQVEsRUFBRTt3Q0FDZCxLQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztxQ0FDNUI7b0NBQ0QsT0FBTyxJQUFJLENBQUM7aUNBQ1o7Z0NBQ0QsT0FBTyxLQUFLLENBQUM7NkJBQ2I7eUJBQ0QsQ0FBQyxDQUFDO3dCQUVILElBQUksQ0FBQyxVQUFVLENBQUM7NEJBQ2YsRUFBRSxFQUFFLDhCQUE4Qjs0QkFDbEMsSUFBSSxFQUFFLGdEQUFnRDs7Ozs0QkFJdEQsYUFBYSxFQUFFLFVBQUMsUUFBaUI7Z0NBQ2hDLElBQUksSUFBSSxHQUFHLEtBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQztnQ0FDekMsSUFBSSxJQUFJLEVBQUU7b0NBQ1QsSUFBSSxDQUFDLFFBQVEsRUFBRTt3Q0FDZCxLQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztxQ0FDNUI7b0NBQ0QsT0FBTyxJQUFJLENBQUM7aUNBQ1o7Z0NBQ0QsT0FBTyxLQUFLLENBQUM7NkJBQ2I7eUJBQ0QsQ0FBQyxDQUFDO3dCQUVILElBQUksQ0FBQyxVQUFVLENBQUM7NEJBQ2YsRUFBRSxFQUFFLCtCQUErQjs0QkFDbkMsSUFBSSxFQUFFLG1EQUFtRDs7Ozs0QkFJekQsYUFBYSxFQUFFLFVBQUMsUUFBaUI7Z0NBQ2hDLElBQUksSUFBSSxHQUFHLEtBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQztnQ0FDekMsSUFBSSxJQUFJLEVBQUU7b0NBQ1QsSUFBSSxDQUFDLFFBQVEsRUFBRTt3Q0FDZCxLQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztxQ0FDN0I7b0NBQ0QsT0FBTyxJQUFJLENBQUM7aUNBQ1o7Z0NBQ0QsT0FBTyxLQUFLLENBQUM7NkJBQ2I7eUJBQ0QsQ0FBQyxDQUFDO3dCQUVILElBQUksQ0FBQyxVQUFVLENBQUM7NEJBQ2YsRUFBRSxFQUFFLDhCQUE4Qjs0QkFDbEMsSUFBSSxFQUFFLGtEQUFrRDs7Ozs0QkFJeEQsYUFBYSxFQUFFLFVBQUMsUUFBaUI7Z0NBQ2hDLElBQUksSUFBSSxHQUFHLEtBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQztnQ0FDekMsSUFBSSxJQUFJLEVBQUU7b0NBQ1QsSUFBSSxDQUFDLFFBQVEsRUFBRTt3Q0FDZCxLQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztxQ0FDOUI7b0NBQ0QsT0FBTyxJQUFJLENBQUM7aUNBQ1o7Z0NBQ0QsT0FBTyxLQUFLLENBQUM7NkJBQ2I7eUJBQ0QsQ0FBQyxDQUFDO3dCQUVILElBQUksQ0FBQyxVQUFVLENBQUM7NEJBQ2YsRUFBRSxFQUFFLHVDQUF1Qzs0QkFDM0MsSUFBSSxFQUFFLDJEQUEyRDs7Ozs0QkFJakUsYUFBYSxFQUFFLFVBQUMsUUFBaUI7Z0NBQ2hDLElBQUksSUFBSSxHQUFHLEtBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQztnQ0FDekMsSUFBSSxJQUFJLEVBQUU7b0NBQ1QsSUFBSSxDQUFDLFFBQVEsRUFBRTt3Q0FDZCxLQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztxQ0FDOUI7b0NBQ0QsT0FBTyxJQUFJLENBQUM7aUNBQ1o7Z0NBQ0QsT0FBTyxLQUFLLENBQUM7NkJBQ2I7eUJBQ0QsQ0FBQyxDQUFDO3dCQUVILElBQUksQ0FBQyxVQUFVLENBQUM7NEJBQ2YsRUFBRSxFQUFFLGdDQUFnQzs0QkFDcEMsSUFBSSxFQUFFLHVEQUF1RDs7Ozs0QkFJN0QsYUFBYSxFQUFFLFVBQUMsUUFBaUI7Z0NBQ2hDLElBQUksSUFBSSxHQUFHLEtBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQztnQ0FDekMsSUFBSSxJQUFJLEVBQUU7b0NBQ1QsSUFBSSxDQUFDLFFBQVEsRUFBRTt3Q0FDZCxLQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztxQ0FDOUI7b0NBQ0QsT0FBTyxJQUFJLENBQUM7aUNBQ1o7Z0NBQ0QsT0FBTyxLQUFLLENBQUM7NkJBQ2I7eUJBQ0QsQ0FBQyxDQUFDO3dCQUVILElBQUksQ0FBQyxVQUFVLENBQUM7NEJBQ2YsRUFBRSxFQUFFLGlDQUFpQzs0QkFDckMsSUFBSSxFQUFFLHdEQUF3RDs7Ozs0QkFJOUQsYUFBYSxFQUFFLFVBQUMsUUFBaUI7Z0NBQ2hDLElBQUksSUFBSSxHQUFHLEtBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQztnQ0FDekMsSUFBSSxJQUFJLEVBQUU7b0NBQ1QsSUFBSSxDQUFDLFFBQVEsRUFBRTt3Q0FDZCxLQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztxQ0FDL0I7b0NBQ0QsT0FBTyxJQUFJLENBQUM7aUNBQ1o7Z0NBQ0QsT0FBTyxLQUFLLENBQUM7NkJBQ2I7eUJBQ0QsQ0FBQyxDQUFDO3dCQUVILElBQUksQ0FBQyxVQUFVLENBQUM7NEJBQ2YsRUFBRSxFQUFFLGlCQUFpQjs0QkFDckIsSUFBSSxFQUFFLDJCQUEyQjs7Ozs0QkFJakMsUUFBUSxFQUFFO2dDQUNULEtBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQzs2QkFDdEI7eUJBQ0QsQ0FBQyxDQUFDO3dCQUVILElBQUksQ0FBQyxVQUFVLENBQUM7NEJBQ2YsRUFBRSxFQUFFLGtCQUFrQjs0QkFDdEIsSUFBSSxFQUFFLDRDQUE0Qzs7Ozs0QkFJbEQsYUFBYSxFQUFFLFVBQUMsUUFBaUI7Z0NBQ2hDLElBQUksSUFBSSxHQUFHLEtBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQztnQ0FDekMsSUFBSSxJQUFJLEVBQUU7b0NBQ1QsSUFBSSxDQUFDLFFBQVEsRUFBRTt3Q0FDZCxLQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7cUNBQ3ZCO29DQUNELE9BQU8sSUFBSSxDQUFDO2lDQUNaO2dDQUNELE9BQU8sS0FBSyxDQUFDOzZCQUNiO3lCQUNELENBQUMsQ0FBQzt3QkFFSCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksbUJBQW1CLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDOzs7O3dCQU01RCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxVQUFDLEdBQWU7NEJBQ3hELElBQUksS0FBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLElBQUksU0FBUyxFQUFFO2dDQUM1QyxJQUFJLEdBQUcsQ0FBQyxNQUFNLEVBQUU7b0NBQ2YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxLQUFLLGVBQWUsTUFBTSxHQUFHLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxFQUFFO3dDQUMxRyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO3dDQUNuQixLQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3FDQUNuQjtpQ0FDRDs2QkFDRDs0QkFDRCxJQUFJLEtBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLElBQUksU0FBUyxFQUFFO2dDQUNoRCxJQUFJLEdBQUcsQ0FBQyxPQUFPLElBQUksR0FBRyxDQUFDLE1BQU0sRUFBRTtvQ0FDOUIsS0FBSyxHQUFHLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsc0JBQXNCLENBQUMsR0FBRzt3Q0FDNUQsSUFBSUMsZUFBTSxDQUFDLCtGQUErRixDQUFDLENBQUM7cUNBQzVHO3lDQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsS0FBSyxHQUFHLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUU7d0NBQ3JHLElBQUksV0FBVyxHQUFHLEtBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO3dDQUMxRCxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO3dDQUN4QixLQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRSxXQUFXLENBQUMsQ0FBQztxQ0FDcEM7aUNBQ0Q7NkJBQ0Q7eUJBQ0QsQ0FBQyxDQUFDOzs7OztLQUNIO0lBRUQsa0NBQVEsR0FBUjtRQUNDLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUNBQWlDLENBQUMsQ0FBQztLQUMvQztJQUVELHlDQUFlLEdBQWY7UUFDQyxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQzNCLElBQUksa0JBQWtCLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQztRQUN6RCxJQUFJLEtBQUssR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3hDLElBQU0saUJBQWlCLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxJQUFJLEtBQUssa0JBQWtCO2VBQ3JFLENBQUMsQ0FBQyxJQUFJLEtBQUssa0JBQWtCO2VBQzdCLENBQUMsQ0FBQyxRQUFRLEtBQUssa0JBQWtCLEdBQUEsQ0FDcEMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVOLElBQUksZUFBZSxHQUFHLFdBQVcsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7UUFFakUsSUFBSSxNQUFNLEdBQUcsV0FBVyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUM7UUFDdkUsSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDcEIsSUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBRTFCLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsTUFBTTtZQUM5RCxHQUFHLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztZQUNqQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDZixDQUFDLENBQUM7S0FDSDtJQUVELHdDQUFjLEdBQWQ7UUFDQyxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQzNCLElBQUksa0JBQWtCLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQztRQUN6RCxJQUFJLE1BQU0sR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQztRQUN2RSxJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDaEMsSUFBSSxLQUFLLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUN4QyxJQUFNLGlCQUFpQixHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsSUFBSSxLQUFLLGtCQUFrQjtlQUNyRSxDQUFDLENBQUMsSUFBSSxLQUFLLGtCQUFrQjtlQUM3QixDQUFDLENBQUMsUUFBUSxLQUFLLGtCQUFrQixHQUFBLENBQ3BDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFTixXQUFXLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNoRCxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3pCLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztLQUNmO0lBRUQseUNBQWUsR0FBZixVQUFnQixXQUFtQixFQUFFLFVBQWtCO1FBQ3RELElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDM0IsSUFBSSxNQUFNLEdBQUcsV0FBVyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUM7UUFDdkUsSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2hDLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUM7UUFFL0MsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQztRQUVuRCxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsR0FBRyxXQUFXLENBQUMsQ0FBQztRQUV0QyxJQUFJLGtCQUFrQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUM7UUFFekQsSUFBSSxLQUFLLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUN4QyxJQUFNLGlCQUFpQixHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsSUFBSSxLQUFLLGtCQUFrQjtlQUNyRSxDQUFDLENBQUMsSUFBSSxLQUFLLGtCQUFrQjtlQUM3QixDQUFDLENBQUMsUUFBUSxLQUFLLGtCQUFrQixHQUFBLENBQ3BDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFTixPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixHQUFHLGlCQUFpQixDQUFDLENBQUM7UUFFbkQsSUFBSSxDQUFDLGlCQUFpQixFQUFFO1lBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQUMsK0ZBQStGLENBQUMsQ0FBQztZQUU3RyxJQUFJLFFBQVEsR0FBRyxVQUFVLEdBQUcsV0FBVyxDQUFDO1lBQ3hDLElBQUksZ0JBQWdCLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsa0JBQWtCLEdBQUcsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1NBQ3RGO2FBQU07WUFDTixPQUFPLENBQUMsR0FBRyxDQUFDLHFFQUFxRSxDQUFDLENBQUM7WUFFbkYsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxNQUFNO2dCQUM5RCxJQUFJLGdCQUFnQixHQUFHLE1BQU0sQ0FBQzs7Z0JBRTlCLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQztnQkFDdkIsSUFBSSxTQUFTLEVBQUU7b0JBQ2QsV0FBVyxHQUFHLE1BQU0sQ0FBQztpQkFDckI7Z0JBQ0QsSUFBSSxXQUFXLEdBQUcsZ0JBQWdCLEdBQUcsV0FBVyxHQUFHLFVBQVUsR0FBRyxXQUFXLENBQUM7Z0JBQzVFLFdBQVcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLGlCQUFpQixFQUFFLFdBQVcsQ0FBQyxDQUFDO2dCQUN6RCxJQUFJQSxlQUFNLENBQUMsUUFBUSxHQUFHLFVBQVUsR0FBRyxvQkFBb0IsQ0FBQyxDQUFBO2FBQ3hELENBQUMsQ0FBQztTQUNIO1FBQ0QsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN6QixNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7S0FDZjtJQUVELHlDQUFlLEdBQWYsVUFBZ0IsU0FBaUI7UUFDL0IsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUUzQixJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDaEIsSUFBSSxVQUFVLEdBQUcsc0NBQXNDLENBQUM7UUFDeEQsSUFBSSxnQkFBZ0IsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDO1FBQ3pDLEtBQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUc7WUFDM0IsTUFBTSxJQUFJLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO1NBQzVFO1FBQ0QsT0FBTyxNQUFNLENBQUM7S0FDZjtJQUVELGtDQUFRLEdBQVIsVUFBUyxTQUFpQixFQUFFLFFBQWdCO1FBQzNDLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDM0IsSUFBSSxVQUFVLEdBQUcsV0FBVyxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDO1FBQ3pFLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLEdBQUcsU0FBUyxHQUFHLGVBQWUsQ0FBQyxDQUFDO1FBQ2hFLElBQUksV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUNyQixJQUFJLFVBQVUsRUFBRTtZQUNmLEtBQUssSUFBSSxTQUFTLElBQUksVUFBVSxFQUFFO2dCQUNqQyxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixHQUFHLFNBQVMsQ0FBQyxDQUFDO2dCQUM1QyxJQUFJLFdBQVcsR0FBRyxJQUFJLE1BQU0sQ0FBQyxHQUFHLEdBQUcsU0FBUyxHQUFHLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDNUQsSUFBSSxTQUFTLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxFQUFFO29CQUNqQyxXQUFXLEdBQUcsU0FBUyxDQUFDO29CQUN4QixPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsR0FBRyxXQUFXLENBQUMsQ0FBQztvQkFDM0MsT0FBTyxXQUFXLENBQUM7aUJBQ25CO2FBQ0Q7WUFDRCxPQUFPLFdBQVcsQ0FBQztTQUNuQjtRQUNELE9BQU8sV0FBVyxDQUFDO0tBQ25CO0lBRUQsa0NBQVEsR0FBUixVQUFTLGNBQXFCO1FBQzdCLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFFM0IsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUM7UUFFM0MsSUFBSSxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ3BCLElBQUksU0FBUyxLQUFLLE9BQU8sRUFBRTtZQUMxQixVQUFVLEdBQUcsR0FBRyxDQUFDO1NBQ2pCO1FBRUQsSUFBSSxXQUFXLEdBQUcsVUFBVSxHQUFHLElBQUksR0FBRyxjQUFjLENBQUMsTUFBTSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDN0UsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLEVBQUUsNkJBQTZCLENBQUMsQ0FBQztLQUNqRTtJQUVELHNDQUFZLEdBQVosVUFBYSxjQUFxQixFQUFFLFVBQWtCO1FBQ3JELE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUU5QixJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBRTNCLElBQUksUUFBUSxHQUFHLGNBQWMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDO1FBRS9DLEtBQUssY0FBYyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHO1lBQ3JELFFBQVEsR0FBRyxjQUFjLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUM7U0FDdEQ7UUFFRCxPQUFPLENBQUMsR0FBRyxDQUFDLGdDQUFnQyxHQUFHLFFBQVEsQ0FBQyxDQUFDOztRQUd6RCxJQUFJLGVBQWUsR0FBRyxVQUFVLENBQUM7UUFDakMsSUFBSSxRQUFRLEdBQUcsV0FBVyxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsZUFBZSxFQUFFLGVBQWUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFckcsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQztRQUUvQyxJQUFJLFFBQVEsSUFBSSxFQUFFLEVBQUU7WUFFbkIsSUFBSSxTQUFTLEtBQUssTUFBTSxFQUFFO2dCQUN6QixJQUFJLFdBQVcsR0FBRyxRQUFRLENBQUM7Z0JBQzNCLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxFQUFFLG1DQUFtQyxDQUFDLENBQUM7YUFDdkU7aUJBQU07Z0JBQ04sSUFBSSxVQUFVLEdBQUcsRUFBRSxDQUFDO2dCQUVwQixJQUFJLFNBQVMsS0FBSyxPQUFPLEVBQUU7b0JBQzFCLFVBQVUsR0FBRyxHQUFHLENBQUM7aUJBQ2pCO2dCQUVELE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQztnQkFDbkMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxlQUFlLENBQUMsS0FBSyxFQUFFLEVBQUU7b0JBQ3BELFFBQVEsR0FBRyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7b0JBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0RBQXdELENBQUMsQ0FBQztvQkFDdEUsV0FBVyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7b0JBQ3hELElBQUksZUFBYSxHQUFHLFFBQVEsR0FBRyxJQUFJLEdBQUcsV0FBVyxDQUFDO29CQUNsRCxXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxNQUFNO3dCQUM1RCxJQUFJLGdCQUFnQixHQUFHLE1BQU0sQ0FBQzt3QkFDOUIsSUFBSSxXQUFXLEdBQUcsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxlQUFhLENBQUMsQ0FBQzt3QkFDcEUsV0FBVyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsZUFBZSxFQUFFLFdBQVcsQ0FBQyxDQUFDO3FCQUN2RCxDQUFDLENBQUE7aUJBQ0Y7cUJBQU07b0JBQ04sSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsZUFBZSxDQUFDLENBQUM7b0JBQzNELE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7aUJBQ3pCO2dCQUVELElBQUksV0FBVyxHQUFHLFVBQVUsR0FBRyxJQUFJLEdBQUcsUUFBUSxHQUFHLElBQUksR0FBRyxXQUFXLEdBQUcsSUFBSSxDQUFDO2dCQUMzRSxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUN6QixJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsRUFBRSxtQ0FBbUMsQ0FBQyxDQUFDO2FBQ3ZFO1NBQ0Q7YUFBTTtZQUNOLElBQUlBLGVBQU0sQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFDO1NBQ3JEO0tBQ0Q7SUFFRCw2Q0FBbUIsR0FBbkI7UUFDQyxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQzNCLElBQUksV0FBVyxHQUFHLFdBQVcsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQzs7UUFFeEQsSUFBSSxlQUFlLEdBQUcsV0FBVyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztRQUNqRSxJQUFJLFFBQVEsR0FBRyxXQUFXLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxlQUFlLEVBQUUsZUFBZSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNyRyxJQUFJLE1BQU0sR0FBRyxXQUFXLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQztRQUU3QyxJQUFJLFdBQVcsR0FBRyxJQUFJLEdBQUcsUUFBUSxHQUFHLElBQUksQ0FBQztRQUN6QyxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxFQUFFLDRCQUE0QixDQUFDLENBQUM7S0FDaEU7SUFFRCw4Q0FBb0IsR0FBcEI7UUFDQyxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDOztRQUUzQixJQUFJLGVBQWUsR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ2pFLElBQUksUUFBUSxHQUFHLFdBQVcsQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLGVBQWUsRUFBRSxlQUFlLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRXJHLElBQUksV0FBVyxHQUFHLEtBQUssR0FBRyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQzFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLEVBQUUsOEJBQThCLENBQUMsQ0FBQztLQUNsRTtJQUVELGdEQUFzQixHQUF0QjtRQUNDLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7O1FBRzNCLElBQUksV0FBVyxHQUFHLFdBQVcsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQztRQUN4RCxJQUFJLGVBQWUsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDO1FBQ3ZDLElBQUksTUFBTSxHQUFHLFdBQVcsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDO1FBQzdDLElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUVoQyxJQUFJLFdBQVcsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQzs7UUFJdkQsSUFBSSxRQUFRLEdBQUcsV0FBVyxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsZUFBZSxDQUFDLENBQUMsUUFBUSxDQUFDO1FBQ2hGLElBQUksY0FBYyxDQUFDO1FBQ25CLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdEIsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNkLElBQUlBLGVBQU0sQ0FBQyw0Q0FBNEMsQ0FBQyxDQUFDO1lBQ3pELE9BQU87U0FDUDthQUFNO1lBQ04sS0FBd0IsVUFBUSxFQUFSLHFCQUFRLEVBQVIsc0JBQVEsRUFBUixJQUFRLEVBQUU7Z0JBQTdCLElBQUksV0FBVyxpQkFBQTtnQkFDbkIsSUFBSSxpQkFBaUIsR0FBRyxXQUFXLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7Z0JBQ3hELElBQUksaUJBQWlCLElBQUksV0FBVyxFQUFFO29CQUNyQyxjQUFjLEdBQUcsV0FBVyxDQUFDO29CQUM3QixNQUFNO2lCQUNOO3FCQUFNLElBQUksaUJBQWlCLEdBQUcsV0FBVyxFQUFFO29CQUMzQyxNQUFNO2lCQUNOO2dCQUNGLGNBQWMsR0FBRyxXQUFXLENBQUM7YUFDNUI7U0FDRDtRQUdELElBQUksUUFBUSxHQUFHLFdBQVcsQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLGVBQWUsRUFBRSxlQUFlLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRXJHLElBQUksV0FBVyxHQUFHLElBQUksR0FBRyxRQUFRLEdBQUcsR0FBRyxHQUFHLGNBQWMsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3hFLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLEVBQUUsK0JBQStCLENBQUMsQ0FBQztLQUNuRTtJQUVELGlEQUF1QixHQUF2QjtRQUNDLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7O1FBRzNCLElBQUksV0FBVyxHQUFHLFdBQVcsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQztRQUN4RCxJQUFJLGVBQWUsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDO1FBQ3ZDLElBQUksTUFBTSxHQUFHLFdBQVcsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDO1FBQzdDLElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUVoQyxJQUFJLFdBQVcsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQzs7UUFJdkQsSUFBSSxRQUFRLEdBQUcsV0FBVyxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsZUFBZSxDQUFDLENBQUMsUUFBUSxDQUFDO1FBQ2hGLElBQUksY0FBYyxDQUFDO1FBQ25CLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdEIsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNkLElBQUlBLGVBQU0sQ0FBQyw0Q0FBNEMsQ0FBQyxDQUFDO1lBQ3pELE9BQU87U0FDUDthQUFNO1lBQ04sS0FBd0IsVUFBUSxFQUFSLHFCQUFRLEVBQVIsc0JBQVEsRUFBUixJQUFRLEVBQUU7Z0JBQTdCLElBQUksV0FBVyxpQkFBQTtnQkFDbkIsSUFBSSxpQkFBaUIsR0FBRyxXQUFXLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7Z0JBQ3hELElBQUksaUJBQWlCLElBQUksV0FBVyxFQUFFO29CQUNyQyxjQUFjLEdBQUcsV0FBVyxDQUFDO29CQUM3QixNQUFNO2lCQUNOO3FCQUFNLElBQUksaUJBQWlCLEdBQUcsV0FBVyxFQUFFO29CQUMzQyxNQUFNO2lCQUNOO2dCQUNGLGNBQWMsR0FBRyxXQUFXLENBQUM7YUFDNUI7U0FDRDtRQUdELElBQUksUUFBUSxHQUFHLFdBQVcsQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLGVBQWUsRUFBRSxlQUFlLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRXJHLElBQUksV0FBVyxHQUFHLEtBQUssR0FBRyxRQUFRLEdBQUcsR0FBRyxHQUFHLGNBQWMsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3pFLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLEVBQUUsK0JBQStCLENBQUMsQ0FBQztLQUNuRTtJQUVELDhDQUFvQixHQUFwQjtRQUNDLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7O1FBRzNCLElBQUksV0FBVyxHQUFHLFdBQVcsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQztRQUN4RCxJQUFJLGVBQWUsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDO1FBQ3ZDLElBQUksTUFBTSxHQUFHLFdBQVcsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDO1FBQzdDLElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNoQyxJQUFJLFFBQVEsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRXRCLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUNuQyxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxlQUFlLENBQUMsQ0FBQztRQUMzRCxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRXpCLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsZUFBZSxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ3BELE9BQU8sQ0FBQyxHQUFHLENBQUMsd0RBQXdELENBQUMsQ0FBQztZQUN0RSxXQUFXLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUN4RCxJQUFJLGVBQWEsR0FBRyxRQUFRLEdBQUcsSUFBSSxHQUFHLFdBQVcsQ0FBQztZQUNsRCxXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxNQUFNO2dCQUM1RCxJQUFJLGdCQUFnQixHQUFHLE1BQU0sQ0FBQztnQkFDOUIsSUFBSSxXQUFXLEdBQUcsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxlQUFhLENBQUMsQ0FBQztnQkFDcEUsV0FBVyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsZUFBZSxFQUFFLFdBQVcsQ0FBQyxDQUFDO2FBQ3ZELENBQUMsQ0FBQTtTQUNGO1FBRUQsSUFBSSxRQUFRLEdBQUcsV0FBVyxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsZUFBZSxFQUFFLGVBQWUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFckcsSUFBSSxXQUFXLEdBQUcsSUFBSSxHQUFHLFFBQVEsR0FBRyxJQUFJLEdBQUcsV0FBVyxHQUFHLElBQUksQ0FBQztRQUM5RCxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxFQUFFLDZCQUE2QixDQUFDLENBQUM7S0FDakU7SUFFRCwrQ0FBcUIsR0FBckI7UUFDQyxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDOztRQUczQixJQUFJLFdBQVcsR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7UUFDeEQsSUFBSSxlQUFlLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQztRQUN2QyxJQUFJLE1BQU0sR0FBRyxXQUFXLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQztRQUM3QyxJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDaEMsSUFBSSxRQUFRLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUV0QixPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDbkMsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsZUFBZSxDQUFDLENBQUM7UUFDM0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUV6QixJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLGVBQWUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNwRCxPQUFPLENBQUMsR0FBRyxDQUFDLHdEQUF3RCxDQUFDLENBQUM7WUFDdEUsV0FBVyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDeEQsSUFBSSxlQUFhLEdBQUcsUUFBUSxHQUFHLElBQUksR0FBRyxXQUFXLENBQUM7WUFDbEQsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsTUFBTTtnQkFDNUQsSUFBSSxnQkFBZ0IsR0FBRyxNQUFNLENBQUM7Z0JBQzlCLElBQUksV0FBVyxHQUFHLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsZUFBYSxDQUFDLENBQUM7Z0JBQ3BFLFdBQVcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLGVBQWUsRUFBRSxXQUFXLENBQUMsQ0FBQzthQUN2RCxDQUFDLENBQUE7U0FDRjtRQUVELElBQUksUUFBUSxHQUFHLFdBQVcsQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLGVBQWUsRUFBRSxlQUFlLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRXJHLElBQUksV0FBVyxHQUFHLEtBQUssR0FBRyxRQUFRLEdBQUcsSUFBSSxHQUFHLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFDL0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN6QixJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsRUFBRSw2QkFBNkIsQ0FBQyxDQUFDO0tBQ2pFO0lBRUQsZ0RBQXNCLEdBQXRCO1FBQ0MsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUUzQixJQUFJLFdBQVcsR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7UUFDeEQsSUFBSSxNQUFNLEdBQUcsV0FBVyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUM7UUFDN0MsSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2hDLElBQUksUUFBUSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzNDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFdEIsSUFBSSxXQUFXLEdBQUcsUUFBUSxDQUFDO1FBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLEVBQUUsNkJBQTZCLENBQUMsQ0FBQztLQUNqRTtJQUVELGdEQUFzQixHQUF0QjtRQUNDLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFFM0IsSUFBSSxXQUFXLEdBQUcsV0FBVyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDO1FBQ3hELElBQUksZUFBZSxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUM7UUFDdkMsSUFBSSxNQUFNLEdBQUcsV0FBVyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUM7UUFDN0MsSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2hDLElBQUksUUFBUSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzNDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7O1FBSXRCLElBQUksWUFBWSxHQUFHLElBQUksTUFBTSxDQUFDLHFDQUFxQyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRTVFLElBQUksc0JBQXNCLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFaEUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQ25DLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBQzNELE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFekIsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxlQUFlLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDcEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3REFBd0QsQ0FBQyxDQUFDO1lBQ3RFLFdBQVcsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3hELElBQUksZUFBYSxHQUFHLFFBQVEsR0FBRyxJQUFJLEdBQUcsV0FBVyxDQUFDO1lBQ2xELFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLE1BQU07Z0JBQzVELElBQUksZ0JBQWdCLEdBQUcsTUFBTSxDQUFDO2dCQUM5QixJQUFJLFdBQVcsR0FBRyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLGVBQWEsQ0FBQyxDQUFDO2dCQUNwRSxXQUFXLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUUsV0FBVyxDQUFDLENBQUM7YUFDdkQsQ0FBQyxDQUFBO1NBQ0Y7UUFFRCxJQUFJLFFBQVEsR0FBRyxXQUFXLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxlQUFlLEVBQUUsZUFBZSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUVyRyxJQUFJLGVBQWUsR0FBRyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUVuRCxJQUFJLFdBQVcsR0FBRyxHQUFHLEdBQUcsc0JBQXNCLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxlQUFlLEdBQUcsSUFBSSxHQUFHLFdBQVcsR0FBRyxHQUFHLENBQUM7UUFDeEcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN6QixJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsRUFBRSxvQ0FBb0MsQ0FBQyxDQUFDO0tBQ3hFO0lBRUYsc0JBQUM7QUFBRCxDQTduQkEsQ0FBNkNDLGVBQU0sR0E2bkJsRDtBQUVEO0lBQUE7UUFDQyxzQkFBaUIsR0FBRyxXQUFXLENBQUM7UUFDaEMsd0JBQW1CLEdBQUcsRUFBRSxDQUFDO1FBQ3pCLGlCQUFZLEdBQUcsTUFBTSxDQUFDO1FBQ3RCLHFCQUFnQixHQUFHLE9BQU8sQ0FBQztRQUMzQixxQkFBZ0IsR0FBRyxLQUFLLENBQUM7S0FDekI7SUFBRCx3QkFBQztBQUFELENBQUMsSUFBQTtBQUVEO0lBQWtDLHVDQUFnQjtJQUFsRDs7S0E0RUM7SUEzRUEscUNBQU8sR0FBUDtRQUFBLGlCQTBFQztRQXpFSyxJQUFBLFdBQVcsR0FBSSxJQUFJLFlBQVIsQ0FBUztRQUN6QixJQUFNLE1BQU0sR0FBUyxJQUFZLENBQUMsTUFBTSxDQUFDO1FBRXpDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUVwQixXQUFXLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxFQUFDLElBQUksRUFBRSxvQkFBb0IsRUFBQyxDQUFDLENBQUM7UUFFekQsSUFBSUMsZ0JBQU8sQ0FBQyxXQUFXLENBQUM7YUFDdEIsT0FBTyxDQUFDLHFCQUFxQixDQUFDO2FBQzlCLE9BQU8sQ0FBQywrREFBK0QsQ0FBQzthQUN4RSxPQUFPLENBQUMsVUFBQSxJQUFJO1lBQ1osT0FBQSxJQUFJO2lCQUNGLGNBQWMsQ0FBQyxXQUFXLENBQUM7aUJBQzNCLFFBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDO2lCQUMzQyxRQUFRLENBQUMsVUFBQyxLQUFLO2dCQUNmLE1BQU0sQ0FBQyxRQUFRLENBQUMsaUJBQWlCLEdBQUcsS0FBSyxDQUFDO2dCQUMxQyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUNsQyxDQUFDO1NBQUEsQ0FBQyxDQUFDO1FBRU4sSUFBSUEsZ0JBQU8sQ0FBQyxXQUFXLENBQUM7YUFDdEIsT0FBTyxDQUFDLHVCQUF1QixDQUFDO2FBQ2hDLE9BQU8sQ0FBQyxxRUFBcUUsQ0FBQzthQUM5RSxPQUFPLENBQUMsVUFBQSxJQUFJO1lBQ1osT0FBQSxJQUFJO2lCQUNGLGNBQWMsQ0FBQyxFQUFFLENBQUM7aUJBQ2xCLFFBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDO2lCQUM3QyxRQUFRLENBQUMsVUFBQyxLQUFLO2dCQUNmLE1BQU0sQ0FBQyxRQUFRLENBQUMsbUJBQW1CLEdBQUcsS0FBSyxDQUFDO2dCQUM1QyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUNsQyxDQUFDO1NBQUEsQ0FBQyxDQUFDO1FBRU4sSUFBSUEsZ0JBQU8sQ0FBQyxXQUFXLENBQUM7YUFDdEIsT0FBTyxDQUFDLGFBQWEsQ0FBQzthQUN0QixPQUFPLENBQUMsMkVBQTJFLENBQUM7YUFDcEYsU0FBUyxDQUFDLFVBQUMsTUFBTTtZQUNqQixNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUNsRCxNQUFNLENBQUMsUUFBUSxDQUFDLFVBQU8sS0FBSzs7b0JBQzNCLE1BQU0sQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO29CQUN6QyxPQUFPLENBQUMsR0FBRyxDQUFDLHNDQUFzQyxHQUFHLEtBQUssQ0FBQyxDQUFDO29CQUMxRCxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQzs7O2lCQUNuQyxDQUFDLENBQUM7U0FDSCxDQUFDLENBQUM7UUFFSixJQUFJQSxnQkFBTyxDQUFDLFdBQVcsQ0FBQzthQUN0QixPQUFPLENBQUMsZ0JBQWdCLENBQUM7YUFDekIsT0FBTyxDQUFDLHdMQUF3TCxDQUFDO2FBQ2pNLFdBQVcsQ0FBQyxVQUFBLFFBQVE7WUFDcEIsT0FBQSxRQUFRO2lCQUNOLFNBQVMsQ0FBQyxNQUFNLEVBQUUsaUNBQWlDLENBQUM7aUJBQ3BELFNBQVMsQ0FBQyxPQUFPLEVBQUUsa0NBQWtDLENBQUM7aUJBQ3RELFNBQVMsQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDO2lCQUMvQixRQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUM7aUJBQ3RDLFFBQVEsQ0FBQyxVQUFDLEtBQWE7Z0JBQ3ZCLE1BQU0sQ0FBQyxRQUFRLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztnQkFDckMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ2pDLEtBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQzthQUNoQixDQUFDO1NBQUEsQ0FBQyxDQUFDO1FBRU4sSUFBSUEsZ0JBQU8sQ0FBQyxXQUFXLENBQUM7YUFDdEIsT0FBTyxDQUFDLHFCQUFxQixDQUFDO2FBQzlCLE9BQU8sQ0FBQyw0TUFBNE0sQ0FBQzthQUNyTixXQUFXLENBQUMsVUFBQSxRQUFRO1lBQ3BCLE9BQUEsUUFBUTtpQkFDTixTQUFTLENBQUMsTUFBTSxFQUFFLFlBQVksQ0FBQztpQkFDL0IsU0FBUyxDQUFDLE9BQU8sRUFBRSxhQUFhLENBQUM7aUJBQ2pDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsV0FBVyxDQUFDO2lCQUM5QixTQUFTLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQztpQkFDL0IsUUFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUM7aUJBQzFDLFFBQVEsQ0FBQyxVQUFDLEtBQWE7Z0JBQ3ZCLE1BQU0sQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO2dCQUN6QyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDakMsS0FBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO2FBQ2hCLENBQUM7U0FBQSxDQUFDLENBQUM7S0FDTjtJQUNGLDBCQUFDO0FBQUQsQ0E1RUEsQ0FBa0NDLHlCQUFnQjs7OzsifQ==
