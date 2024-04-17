class Start extends Scene {
    create() {

        // Access a string
        console.log(this.engine.storyData);
        const key2 = "Credits";
        console.log(this.engine.storyData[key2]);
        console.log(this.engine.storyData.Credits);

        // Variable Keys


        // Solved by using this.engine.storyData.Title
        this.engine.setTitle(this.engine.storyData.Title); // TODO: replace this text using this.engine.storyData to find the story title

        this.engine.addChoice("Begin the story");
    }

    handleChoice() {
        // Solved by using this.engine.storyData.InitialLocation
        this.engine.gotoScene(Location, this.engine.storyData.InitialLocation); // TODO: replace this text by the initial location of the story
    }
}


class Location extends Scene {
    create(key) {
        //solved by setting locationData to this.engine.storyData.Locations[key]
        let locationData = this.engine.storyData.Locations[key]; // TODO: use `key` to get the data object for the current story location

        // Solved by setting the text to locationData.Body
        this.engine.show(locationData.Body); // TODO: replace this text by the Body of the location data
        
        if(locationData.Choices != null) { // TODO: check if the location has any Choices
            for(let choice of locationData.Choices) { // TODO: loop over the location's Choices
                this.engine.addChoice(choice.Text, choice); // TODO: use the Text of the choice
                // TODO: add a useful second argument to addChoice so that the current code of handleChoice below works
                
            }
        } else {
            this.engine.addChoice("The end.")
        }
    }

    handleChoice(choice) {
        if(choice && (choice.Target == "Tavern" || choice.Target == "Tavern Basement" || choice.Target == "Misty Grove" || choice.Target == "Shrine of the Angel")){
            this.engine.show("&gt; "+ choice.Text);
            this.engine.gotoScene(interactableLocation, choice.Target);
        }
        else if(choice) {
            this.engine.show("&gt; "+choice.Text);
            this.engine.gotoScene(Location, choice.Target);
        } else {
            this.engine.gotoScene(End);
        }
    }
}

class interactableLocation extends Location {
    create(key){
        let locationData = this.engine.storyData.Locations[key];
        this.engine.show(locationData.Body);

        if(locationData.Choices != null) {
            for(let choice of locationData.Choices) { // TODO: loop over the location's Choices
                this.engine.addChoice(choice.Text, choice); // TODO: use the Text of the choice
                // TODO: add a useful second argument to addChoice so that the current code of handleChoice below works
                
            }
        } else {
            this.engine.addChoice("The end.")
        }
    }

    handleChoice(choice) {
        /*
        add an if checking of the choice target is equal to a certain value and in that case you will use the interactable scene
        */
        if(choice && (choice.Target == "Tavern" || choice.Target == "Tavern Basement" || choice.Target == "Misty Grove" || choice.Target == "Shrine of the Angel")){
            this.engine.show("&gt; "+ choice.Text);
            this.engine.gotoScene(interactableLocation, choice.Target);
        }
        else if (choice.Interactable){
            switch(choice.Loc){
                case "Tavern":
                    if(choice.Requirement){
                        this.engine.show(choice.Description2);
                        this.engine.gotoScene(interactableLocation, "Tavern");
                    }
                    else{
                        this.engine.show(choice.Description);
                        this.engine.gotoScene(interactableLocation, "Tavern");                        
                    }
                    break;
                case "Tavern Basement":
                    this.engine.show(choice.Description);
                    this.engine.storyData.Locations["Misty Grove"].Choices[1].Requirement = true;
                    this.engine.gotoScene(interactableLocation, "Tavern Basement");
                    break;
                case "Misty Grove":
                    if(choice.Requirement){
                        this.engine.show(choice.Description2);
                        this.engine.gotoScene(Location, "Misty Forest 1");
                    }
                    else{
                        this.engine.show(choice.Description);
                        this.engine.gotoScene(interactableLocation, "Misty Grove");                        
                    }
                    break;
                case "Shrine of the Angel":
                    if(!choice.Requirement){
                        this.engine.storyData.Locations["Tavern"].Choices[3].Requirement = true;
                        this.engine.show(choice.Description);
                        this.engine.gotoScene(interactableLocation, "Shrine of the Angel");
                        choice.Requirement = true;                        
                    }
                    else{
                        this.engine.show(choice.Description2);
                        this.engine.gotoScene(interactableLocation, "Shrine of the Angel");                        
                    }

                    break;
            }

        }
        else if(choice) {
            this.engine.show("&gt; "+choice.Text);
            this.engine.gotoScene(Location, choice.Target);
        } else {
            this.engine.gotoScene(End);
        }
    }
}

class End extends Scene {
    create() {
        this.engine.show("<hr>");
        this.engine.show(this.engine.storyData.Credits);
    }
}

Engine.load(Start, 'myStory.json');