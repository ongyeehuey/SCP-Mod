/**
 * SCP Mod v1.1.0
 *
 * Features :
 *  1.  Expand conversation history on load of SCP issue page
 *  2.  Highlight (default) and/or add label to SUMMARY & Complexity Notes in SCP issue page 
 */

// default variables
var highlight = true;
var label = false;
var color_summary = "honeydew";
var color_complexity = "lavender";

$(document).ready(function() {
    //alert("Welcome to SCP");

    // override user's highlight preference
    if (typeof user_highlight !== 'undefined') {
      highlight = user_highlight;
    }

    if (typeof user_label !== 'undefined') {
      label = user_label;
    }

    // Call function to highlight Notes on load of page
    highlightNotes();
});

$("#l-convs").ready(function() {
    //Expand conversation history on load of SCP issue page if available
    $("#l-convs")[0].click();
});

$("#LoadCoversations").on("DOMNodeInserted", ".rvcon-tb", function(event){  //DOMNodeInserted,DOMSubtreeModified
    //console.log($(this).text());

    // Call function to highlight Notes when a history expanded or when new note is added
    highlightNotes();
});

// Highlight SUMMARY & Complexity Notes in SCP issue page
function highlightNotes(){
    var notes = $("#LoadCoversations").find("[id$='_notes'] .clearboth");

    $.each(notes, function( index, value ) {
        var customize = false;

        var note = value.children[1];
        var outerdiv = note.parentNode.parentNode;
        var innerdiv = outerdiv.children[0];

        var b_color, label_name, label_color = "";

        if( note.innerText.match("##SUMMARY") ){
            customize = true;
            b_color = color_summary;
            label_name = "Summary";
            label_color = "#5cf441";
        }
        else if(note.innerText.match("##Complexity")){
            customize = true;
            b_color = color_complexity;
            label_name = "Complexity";
            label_color = "#4295f4";
            //label_color = "darkorchid";
        }

        if (customize){
            // add label to note (by Loi)
            if(label){
              outerdiv.querySelector("span .conLasi").outerHTML = "<span class='conLasi'>" + label_name + " <span class='conLa' style='background-color:" + label_color + "'></span></span>";;
            }
            // highlight note
            if(highlight){
                outerdiv.style = "background-color : " + b_color;
                innerdiv.style = "background-color : " + b_color;
            }

        }
    });
}