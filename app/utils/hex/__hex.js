// function found on developerfusion.com
export const MultiDimensionalArray= (iRows,iCols) => {
	var i;
	var j;
	var a = new Array(iRows);
	for (i=0; i < iRows; i++) {
		a[i] = new Array(iCols);
		for (j=0; j < iCols; j++) {
			a[i][j] = "";
		}
	}
	return(a);
}

export const setupMap = (mapsize_x = 8, mapsize_y = 8) => {
  // Setup Hexagon Map
  //var mapsize_x = 8;
  //var mapsize_y = 8;
  var mapArray = MultiDimensionalArray(mapsize_x,mapsize_y);
  for (x=0; x  < mapsize_x; x++) {
  	for (y=0; y < mapsize_y; y++) {
  		mapArray[x][y] = "hex_green";
  	}
  }
  mapArray[3][0] = "hex_tree";
  mapArray[3][1] = "hex_tree";
  mapArray[3][2] = "hex_tree";
  mapArray[3][3] = "hex_tree";
  mapArray[2][4] = "hex_tree";
  mapArray[1][5] = "hex_tree";
  mapArray[3][7] = "hex_tree";
  mapArray[4][6] = "hex_tree";
  mapArray[5][5] = "hex_tree";
}

// Draw the map of Hexagons into the div map
export const drawMap = (mapsize_x = 8, mapsize_y = 8) => {
	let hex_tiles = "";
	const row_type = 1;
	const offset=-((mapsize_x/2)*40);
	let z_index=mapsize_x;

	for (x=0; x < mapsize_x; x++) {
		for (y=0; y < mapsize_y; y++) {
			const hex_x = (x * 43)+(y*43);
			const hex_y = (x * -20)+(y*19)-offset ;
			hex_tiles +='<div id="'+ x + '-' + y +'" style="position:absolute;z-index:'+z_index+';left:' + hex_x + 'px;top:' + hex_y + 'px;">';
			hex_tiles +='<div id="hex_' + x + '_' + y + '" class="' + mapArray[x][y] + '" onclick="toggle_hex('+x+','+y+');">';
			hex_tiles +='<span id="hex_coords_' + x + '_' + y + '" style="position:absolute;left:24px;top:15px;">'+x+','+y+'</span>';
			hex_tiles +='</div></div>';
		}
		z_index--;
	}
	document.body.innerHTML += hex_tiles;
}
