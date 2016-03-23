(function() {
    var myDataRef = new Firebase('https://intense-inferno-1925.firebaseio.com/');


    // querySelector, jQuery style
    var $ = function(selector) {
        return document.querySelector(selector);
    };

    // Create function outside loop
    function dynamicEvent() {
        this.innerHTML = '';
        this.className += ' dynamic-success';
    }

    // Iterate over #links <li>
    // Use querySelector to target #links and then get tag names <li>
    var links = $('#links').getElementsByTagName('li');

    // For each <li> inside #links
    for (var i = 0; i < links.length; i++) {
        var link = links[i];

        // <li> onclick, runAlert function
        link.onclick = dynamicEvent;
    }

    // Onsubmit
    $('.generate').onsubmit = function() {

        // Grab the input value
        var dynamicValue = $('.generate-input').value;
        // var text = $('#messageInput').val();
        myDataRef.push({
            // name: name,
            text: dynamicValue,
        });
        $('.generate-input').val('');


        // If empty value
        

        // Prevent the form submitting
        // return false;
    }
    myDataRef.on('child_added', function(snapshot) {
        var message = snapshot.val();
        displayChatMessage( message.text);
    });
    function displayChatMessage(msg){
    	if (!msg) {

            alert('Please enter something.');

        } else {

            // Change the submit value
            $('.generate-submit').value = 'Create new item!';

            // Create the links with the input value as innerHTML
            var li = document.createElement('li');
            li.className = 'dynamic-link';
            li.innerHTML = msg;

            // Append it and attach the event (via onclick)
            $('#links').appendChild(li);
            li.onclick = dynamicEvent;
        }
    }

})();