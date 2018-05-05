/**
 * Author   : Onishim Hasdak
 * Features :
 * Expands conversation history on load of SCP issue page
 * Highlights SUMMARY & Complexity Notes in SCP issue page
 */


$(document).ready(function() {
  //alert("Welcome to SCP");
  
  //Expand conversation history on load of SCP issue page
  if($("#l-convs").length){
	$("#l-convs")[0].click();
  	//fireEvent($("#l-convs")[0], "click");
  }
  
  // Call function to highlight Notes on load of page
  highlightNotes();
});

$("#LoadCoversations").on("DOMNodeInserted", ".rvcon-tb", function(event){	//DOMNodeInserted,DOMSubtreeModified
  //console.log($(this).text());
  
  // Call function to highlight Notes when a history expanded or when new note is added
  highlightNotes();
});

// Highlight SUMMARY & Complexity Notes in SCP issue page
function highlightNotes(){
  var notes = $("#LoadCoversations").find("[id$='_notes'] .clearboth");
  
  $.each(notes, function( index, value ) {
    var note = value.children[1];
    var outerdiv = note.parentNode.parentNode;
    var innerdiv = outerdiv.children[0];
    if( note.innerText.match("##SUMMARY") ){
      //note.parentNode.parentNode.style = "border : 5px solid #fffdbd";
      //note.parentNode.parentNode.style = "border : 4px solid rgb(195, 255, 201);";
      outerdiv.style = "background-color : #c6efce;";
      innerdiv.style = "background-color : #c6efce;";
    }
    else if(note.innerText.match("##Complexity")){
      outerdiv.style = "background-color : lavender";
      innerdiv.style = "background-color : lavender";
    }
  });
}