
class ColorView {
    
    static toCSSColor(color) {
        
        switch(color.toString()) {
            case 'RED':
                return '#ff0000';
            case 'YELLOW':
                return '#ffff00';
            case 'BLUE':
                return '#0000ff';
            case 'GREEN':
                return '#00ff00';
            case 'PURPLE':
                return '#800080';
            case 'ORANGE':
                return '#ffa500';
            case 'PINK':
                return '#ffc0cb';
            case 'BROWN':
                return '#a52a2a';
            case 'BLACK':
                return '#000000';
            case 'WHITE':
                return '#ffffff';
            case 'EMPTY':
                return 'transparent';
        }
    }
}
export default ColorView;