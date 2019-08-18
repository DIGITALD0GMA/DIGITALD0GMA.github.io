//virtual console.log()
var post = function(input) {
	console.log("Posting '" + input + "'");
	$("#commandline").before('<tr class="posted"><td style="color: ' + textColor + ';">' + input + '</td></tr>');
	//window.scrollTo(0, document.body.scrollHeight); //only used if no vertical scroll
	$("#prescroll").scrollTop($("#prescroll")[0].scrollHeight); //scroll down automatically when new line is in overflow
	console.log("---------------------------");
};

var dictionary = [
	"help", "displays the help for a given command of displays the list of commands. (syntax: 'help [argument]')",
	"clear", "clears everything from the console. (aka 'cls')",
	"color", "changes the color of the terminal text. (syntax: 'color [hex code/CSS color name]')",
    "cat", "displays the contents of a file. (syntax: 'cat [filename]', aka 'type')",
    "dir", "displays the files contained in the directory. (aka 'ls')",
    "write", "writes a file with the specified contents. (syntax: 'write [filename] [contents]')",
    "del", "erases a file from the directory. (syntax: 'del [filename]', aka 'rm')",
    // "run", "interprets a stored file as javascript code. (syntax: 'run [filename]')",
	"open", "open a file and write its content onto the webpage. (syntax: 'open [filename]')",
];

var textColor = "white";
var runningAProgram = false;
var database = ['helloworld.txt', 'Hello world!', 'resume.pdf', '/assets/documents/LaFleur-resume.pdf', 'about_me.html', 'assets/html/about_me.html'];


var xContainsY = function(list, term) { //returns the position of Y in X, or false
	console.log("Checking length " + list.length + " array for '" + term + "'...");
	var foundAMatch = false;
    var matchNumber = 0;
	for (var i = 0; i <= (list.length - 1); i++) {
		// console.log("i = " + i + " | term = " + list[i]);
		if (list[i].toLowerCase() === term.toLowerCase()) {
			console.log("#" + i + " is a match!");
            matchNumber = i;
			foundAMatch = true;
		}
	}
	if (foundAMatch === true) {
		// console.log("Found a match!");
		return (matchNumber);
	} else {
		console.log("Found no match.");
		return (false);
	}
};

//wordsep function
var separatedWords = [];
var wordsep = function(input) {
	separatedWords = [];
	/* console.log("WORDSEP input: " + input); */
	//separate the input into words
	var separate = function(chars) {
		//separate the characters
		var parsedInput = [];
		for (i = 0; i < input.length; i++) {
			parsedInput[i] = input[i];
		}
		/* console.log("Parsed input: " + parsedInput); */
		//reconsolidate them into words
		var word = "";
		var analyzer = "";
		var counter = 0;
		for (i = 0; i <= chars.length; i++) {
			analyzer = chars[i];
			if (i > (chars.length - 1)) {
				/* console.log("Hit the end!") */
				separatedWords[counter] = word;
				counter++;
				word = "";
			} else if (analyzer != " ") {
				word += analyzer;
				/* console.log("Word: " + word);
				console.log("Analyzer: " + analyzer); */
			} else {
				/* console.log("Hit a space!"); */
				separatedWords[counter] = word;
				counter++;
				word = "";
			}
		}
	};
	separate(input);
	console.log("Separated words: '" + separatedWords + "'");
	return (separatedWords);
};


//read file from database and return contents
var readFromFile = function(fileName) {
    var fileContents = "";
	var fileExists = (xContainsY(database, fileName));
    if (fileExists === false) {
        return("File '" + separatedWords[1] + "' not found.");
    } else {
        fileContents = (database[fileExists + 1]);
        return(fileContents);
    }
};

//runs the specified command or returns an error
var executeCommand = function(command) {
	console.log("Attempting to execute command: " + command);
    var argument = separatedWords[1];
	switch (command) {
		case "clear":
		case "cls":
			$(".posted").remove();
			$( "#cmdcontent" ).empty();
			console.clear();
			break;
		case "help":
			console.log("separatedWords length: " + separatedWords.length);
			//check if help or help [command]
			if (separatedWords.length <= 1) {
				console.log("Found no arguments for: help");
				post("type 'help [command]' for more information.");
				var commandList = [];
				console.log("Checking the dictionary...");
				console.log("Dictionary length is " + dictionary.length);
				for (var i = 0; i < dictionary.length; i++) {
					console.log("i: " + i);
					if (i % 2 === 0) {
						console.log("i is even (or zero), appending...");
						commandList.push(dictionary[i]);
						console.log("Appending '" + dictionary[i] + "' to commandList.");
					} else {
						console.log("i is odd, not moving on.");
					}
				}
				console.log("Commands: " + commandList);
				post("Commands: " + commandList);
			} else {
				console.log("Found an argument: " + argument);
				var foundAMatch = false;
				var matchNumber = 0;
				console.log("Searching for match in dictionary w/ length " + dictionary.length);
				for (var i = 0; i <= dictionary.length; i++) {
					// console.log("Checking dictionary[" + i + "]...")
					if (argument === dictionary[i]) {
						console.log("Found a match! '" + dictionary[i] + "'");
						foundAMatch = true;
						matchNumber = i;
					}
				}
				if (foundAMatch === true) {
					post(dictionary[matchNumber] + ": " + dictionary[matchNumber + 1]);
				} else {
					console.log("Found no match.");
					post("Command '" + argument + "' not recognized.");
				}
			}
			break;
		case "color":
			if (separatedWords.length < 2) {
				post("Error: No color specified. (syntax: 'color [hex code/CSS color name]')");
			} else {
				var colors = ["AliceBlue", "AntiqueWhite", "Aqua", "Aquamarine", "Azure", "Beige", "Bisque", "Black", "BlanchedAlmond", "Blue", "BlueViolet", "Brown", "BurlyWood", "CadetBlue", "Chartreuse", "Chocolate", "Coral", "CornflowerBlue", "Cornsilk", "Crimson", "Cyan", "DarkBlue", "DarkCyan", "DarkGoldenRod", "DarkGray", "DarkGrey", "DarkGreen", "DarkKhaki", "DarkMagenta", "DarkOliveGreen", "Darkorange", "DarkOrchid", "DarkRed", "DarkSalmon", "DarkSeaGreen", "DarkSlateBlue", "DarkSlateGray", "DarkSlateGrey", "DarkTurquoise", "DarkViolet", "DeepPink", "DeepSkyBlue", "DimGray", "DimGrey", "DodgerBlue", "FireBrick", "FloralWhite", "ForestGreen", "Fuchsia", "Gainsboro", "GhostWhite", "Gold", "GoldenRod", "Gray", "Grey", "Green", "GreenYellow", "HoneyDew", "HotPink", "IndianRed", "Indigo", "Ivory", "Khaki", "Lavender", "LavenderBlush", "LawnGreen", "LemonChiffon", "LightBlue", "LightCoral", "LightCyan", "LightGoldenRodYellow", "LightGray", "LightGrey", "LightGreen", "LightPink", "LightSalmon", "LightSeaGreen", "LightSkyBlue", "LightSlateGray", "LightSlateGrey", "LightSteelBlue", "LightYellow", "Lime", "LimeGreen", "Linen", "Magenta", "Maroon", "MediumAquaMarine", "MediumBlue", "MediumOrchid", "MediumPurple", "MediumSeaGreen", "MediumSlateBlue", "MediumSpringGreen", "MediumTurquoise", "MediumVioletRed", "MidnightBlue", "MintCream", "MistyRose", "Moccasin", "NavajoWhite", "Navy", "OldLace", "Olive", "OliveDrab", "Orange", "OrangeRed", "Orchid", "PaleGoldenRod", "PaleGreen", "PaleTurquoise", "PaleVioletRed", "PapayaWhip", "PeachPuff", "Peru", "Pink", "Plum", "PowderBlue", "Purple", "Red", "RosyBrown", "RoyalBlue", "SaddleBrown", "Salmon", "SandyBrown", "SeaGreen", "SeaShell", "Sienna", "Silver", "SkyBlue", "SlateBlue", "SlateGray", "SlateGrey", "Snow", "SpringGreen", "SteelBlue", "Tan", "Teal", "Thistle", "Tomato", "Turquoise", "Violet", "Wheat", "White", "WhiteSmoke", "Yellow", "YellowGreen"];
				console.log("Argument for 'color': " + argument);
				console.log("Is the arg a hex code? " + ((argument[0] === "#") && (argument.length === 7)));
				if ((xContainsY(colors, argument)) || ((argument[0] === "#") && (argument.length === 7))) {
					textColor = argument;
					post("Changing color to " + argument);
					$("#commandline").css("color", argument); //$("*").css("color", argument); changed to limit color changes
					$(".commandline").css("color", argument);
				} else {
					post("Color '" + argument + "' not recognized.");
				}
			}
			break;
        case "dir":
		case "ls":
            if (database.length < 1) {
                post("The directory is empty.");
                break;
            }
            var fileList = database[0];
            for (var i=1;i<database.length;i++) {
                if (i % 2 === 0) {
                    fileList += "\n" + database[i];
                }
            }
            post(fileList);
      		break;
        case "cat":
		case "type":
            console.log("Opening file " + argument + "...");
			//if actual document
			if(readFromFile(argument) == "$")
			{
				window.open("/assets/documents/LaFleur-resume.pdf");
				post("Opening file " + argument + "...");
			}
			else
			{
				post(readFromFile(argument));
				//post(argument.fileContents); //failed attempt to use objects
			}
            break;
        case "write":
            var fileName = argument;
            var fileContents = "";
            if (separatedWords.length < 2) {
                post("Error: File name not specified.");
                break;
            } else if (separatedWords.length < 3) {
                post("Error: File contents is empty.");
                break;
            }
            for (i=2;i<separatedWords.length;i++) {
                fileContents += separatedWords[i] + " ";
            }
            post("File '" + fileName + "' created.");
            database.push(fileName);
            database.push(fileContents);
            break;
        // case "run":
            // post("Executing program '" + argument + "'...");
            // eval(readFromFile(argument));
            // break;
        case "del":
		case "rm":
            if (xContainsY(database, argument) === false) {
                post("File '" + argument + "' not found.");
                break;
            }
            var filePosition = xContainsY(database, argument);
            database.splice(filePosition, 2);
            post("Deleted file '" + argument + "'.");
            break;
		case "open":
			if (xContainsY(database, argument) === false) {
                post("File '" + argument + "' not found.");
                break;
            }
			else
			{
				console.log("Opening file " + argument + "...");
				post("Opening file " + argument + "...");
				var data = readFromFile(argument);
				$.ajax({
					url:data,
					type:'HEAD',
					error: function()
					{
						$('#cmdcontent').empty().append("<div class='highlight'><pre class='highlight'><code id='codeText'>" + (readFromFile(argument)) + "</code></pre></div>");
					},
					success: function()
					{
						if(argument == "resume.pdf")	//hard coding resume.pdf for now.
						{
							window.open("/assets/documents/LaFleur-resume.pdf");
						}
						else
						{
							$('#cmdcontent').load(readFromFile(argument));
						}
					}
				});
				break;
			}
		default:
			post("Command '" + command + "' not recognized.");
			break;
	}
};

var alertKeyPressed = false;

var commandmemory = [];	//used to fill in text by remembering previous command entries
var commandmemorycount = 0; //index tracker

//when a key is pressed and released...
$(document).keyup(function(event) {
	//command is checked on enter key press
    if (event.keyCode == 13) {
		commandmemorycount = 0; //forget the up arrow count
		var command = $('input[class=commandline]').val();
		commandmemory.push(command);	//remember the entered command
		// console.log("Command length: " + command.length);
		if (command.length > 0) {
			console.log("'" + command + "' is length " + command.length + ".");
			post(">" + command);
			$('input[class=commandline]').val("");
			alertKeyPressed = true;
            if (runningAProgram === false) {
			executeCommand(wordsep(command)[0]); }
		} else {
			console.log("'" + command + "is length 0, not posting.");
		}
	}
	//up arrow should recall previous commands
	if (event.keyCode == 38) {
		if((commandmemory.length > 0) && (commandmemorycount < commandmemory.length))
		{
			commandmemorycount++;
			//console.log(commandmemory[commandmemory.length-commandmemorycount]);
			$('input[class=commandline]').val(commandmemory[commandmemory.length-commandmemorycount]);
		}
	}
	//down arrow, same idea
	if (event.keyCode == 40) {
		if((commandmemory.length > 0) && (commandmemorycount <= commandmemory.length))
		{
			if(commandmemorycount > 0 )
			{
				commandmemorycount--;
				//console.log(commandmemory[commandmemory.length-commandmemorycount]);
				$('input[class=commandline]').val(commandmemory[commandmemory.length-commandmemorycount]);
			}
		}
	}
});

//this should probably be moved away from shell.js
var OpenLink = function()
{
	$('#cmdcontent').load("/assets/html/about_me.html");
}

function toggleCommandlineVisibility() {
  var x = document.getElementById("shellwindow");
  if (x.style.display === "none") 
  {
    x.style.display = "block";
	$('#hideButton').text("Hide");
  } 
  else 
  {
    x.style.display = "none";
	$('#hideButton').text("Show");
  }
} 