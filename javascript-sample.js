((state, timeLeftFn) => {
    const turnDirections = ['right', 'left', 'about-face'];
    const turnDirection = turnDirections[Math.floor(Math.random() * 3)];

    const smokeDirections = ['forward', 'backward', 'left', 'right', 'drop'];
    const smokeDirection = smokeDirections[Math.floor(Math.random() * 5)];

    const index = Math.floor(Math.random() * 17);
    const command = index < 10 ?
        { action: 'move', metadata: {} } :
        index < 12 ?
            { action: 'turn', metadata: { direction: turnDirection } } :
            index < 16 ?
                { action: 'shoot', metadata: {} } :
                { action: 'smoke', metadata: { direction: smokeDirection } };

            /// nearby tiles are listed in 7 lists, left to right. player is always at local 3,3. nearby will be (2,3), (3,2), (3,4), (4,3)
            /// look at these to see what is immediately adjacent to wombat

    var wallTypes = ["wood-barrier", "fog", "steel-barrier"];
    var shootyTypes = ["zakano", "wombat"];
    var scaryTypes = ["shot", "fog", "poison"]

    const above = state.arena[2][3];
    const below = state.arena[4][3];
    const left = state.arena[3][2];
    const right = state.arena[3][4];
    const orientation = state.arena[3][3].contents.orientation;
    var forward = "";

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

    if (wallTypes.indexOf(forward.contents.type) != -1){
        const command = { action: 'turn', metadata: turnDirection}
    } else if (scaryTypes.indexOf(forward.contents.type) != -1){
        const command = { action: 'shoot', metadata: {} } ;
    } else if (scaryTypes.indexOf(forward.contents.type) != -1){
        const command = { action: 'move', metadata: {} }
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
