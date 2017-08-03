((state, timeLeftFn) => {
    const turnDirections = ['right', 'left', 'about-face'];
    const turnDirection = turnDirections[Math.floor(Math.random() * 3)];

    const smokeDirections = ['forward', 'backward', 'left', 'right', 'drop'];
    const smokeDirection = smokeDirections[Math.floor(Math.random() * 5)];

    const index = Math.floor(Math.random() * 17);
    /*const command = index < 10 ?
        { action: 'move', metadata: {} } :
        index < 12 ?
            { action: 'turn', metadata: { direction: turnDirection } } :
            index < 16 ?
                { action: 'shoot', metadata: {} } :
                { action: 'smoke', metadata: { direction: smokeDirection } };

            /// nearby tiles are listed in 7 lists, left to right. player is always at local 3,3. nearby will be (2,3), (3,2), (3,4), (4,3)
            /// look at these to see what is immediately adjacent to wombat*/

    var turnyTypes = ["wood-barrier", "fog", "steel-barrier", "poison", "shot"];
    var shootyTypes = ["zakano", "wombat"];
    var goodTypes = ["food"]


    const adjacents = [
        {"direction" : "n", "content" : state.arena[2][3]},
        {"direction" : "s", "content" : state.arena[4][3]},
        {"direction" : "w", "content" : state.arena[3][2]},
        {"direction" : "e", "content" : state.arena[3][4]}
    ]

    const above = state.arena[2][3];
    const below = state.arena[4][3];
    const left = state.arena[3][2];
    const right = state.arena[3][4];
    const orientation = state.arena[3][3].contents.orientation;
    var forward = "";

    var goDirection = "";

    switch (orientation) {
        case 'e':
            forward = right;
            break;
        case 'w':
            forward = left;
            break;
        case 'n':
            forward = above;
            break;  
        case 's':
            forward = below;
    }

    var command = {}
    var goForFood = false; 
    for (var i = 0; i < 4; i ++) {
        ///0 = n, 1 = s, 2 = w, 3 = e
        if (goodTypes.indexOf(adjacents[i].content.contents.type) != -1){
            ///it's a food item, get it
            goForFood = true;
            var directionToGo = adjacents[i].direction;
            if (orientation == directionToGo){
                command = {action: 'move', metadata : {} };
            } else {
                if ((orientation == "w" && directionToGo == "s") || (orientation == "s" && directionToGo == "e")  || (orientation == "e" && directionToGo == "n")  || (orientation == "n" && directionToGo == "w") ){
                    command = {action: 'turn', metadata : {direction: 'left'}}
                } else if ((orientation == "w" && directionToGo == "n")  || (orientation == "n" && directionToGo == "e")  || (orientation == "e" && directionToGo == "s")  || (orientation == "s" && directionToGo == "w") ){
                    command = {action: 'turn', metadata : {direction: 'right'}}
                } else if ((orientation == "w" && directionToGo == "e")  || (orientation == "e" && directionToGo == "w")  || (orientation == "n" && directionToGo == "s")  || (orientation == "s" && directionToGo == "n") ){
                    command = {action: 'turn', metadata : {direction: 'about-face'}}
                }
            }
        }
    };
    if (goForFood == false){
        if (turnyTypes.indexOf(forward.contents.type) != -1){
            command = {action: 'turn', metadata : {direction: turnDirection}};
        } else if (shootyTypes.indexOf(forward.contents.type) != -1){
            command = { action: 'shoot', metadata: {} };
        } else if (goodTypes.indexOf(forward.contents.type) != -1){
            command = { action: 'move', metadata: {} };
        } else {
            command = { action: 'move', metadata: {} };
        }
    }

    

    return {
        command,
        state: {
            hello: 'world'
        }
    };
});


/*   },
          "meta": []
        },
        {
          "contents": {
            "type": "wood-barrier",
            "hp": 20,
            "uuid": "f078852a-69f6-4120-933b-24d1370e98bf",
            "deterioration-level": "low"
          },
          "meta": []
        },
        {
          "contents": {
            "type": "fog"
          }
        }
      ],
      [
        {
          "contents": {
            "type": "open", */
