import Menu from "../../../../../../../main/resources/static/js/memus/models/generics/Menu.js";
import Option from "../../../../../../../main/resources/static/js/memus/models/generics/Option.js";

describe('menu',() => {
    
    let menu;
    
    beforeEach(() => {
        menu = new Menu();
    });

    afterEach(() => {
        menu = null;
    });


    test('add(option)', () => {

        const option = new Option();
        option.title = 'Option_1';


        menu.add(option);

        expect(menu.hasOption(option)).toBe(true);
        expect(option.title).toBe('Option_1');
        expect(menu.options.length).toBe(1);
    })

    test('add(option) exeption undefined', () => {

        const option = undefined;
        expect(() => menu.add(option)).toThrow('Option is undefined');
    })

    test('add(option) exeption maxOptions', () => {

        for (let i = 0; i < menu.maxOptions; i++) {
            const option = new Option();
            menu.add(option);
        }

        expect(() => menu.add(new Option())).toThrow('Menu is full');
    })

    test('maxOptions', () => {

        for (let i = 0; i < menu.maxOptions; i++) {
            const option = new Option();
            option.title = `Option_${i}`;
            menu.add(option);
        }

        expect(menu.options.length).toBe(20);
    })

    test('remove()', () => {

        for (let i = 0; i < 5; i++) {
            const option = new Option();
            option.title = `Option_${i}`;
            menu.add(option);
        }
        expect(menu.options.length).toBe(5);
        menu.removeOption();
        expect(menu.options.length).toBe(0);
    })

    test('hasOption(option)', () => {

        const option = new Option();
        menu.add(option);

        expect(menu.hasOption(option)).toBe(true);
        
    })
    
    test('hasOption(option) exeption undefined', () => {
        
        const option = undefined;
        expect(() => menu.hasOption(option)).toThrow('Option is undefined');
    })

})