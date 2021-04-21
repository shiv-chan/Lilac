//mixin example
const serializeMixin = (parentClass) => {
  return class extends parentClass {
    serialize(){
      return JSON.stringify(this);
    }
  }
}

const ratingMixin = (parentClass) => {
  class extends parentClass {
    constructor(){
      super();
      this.ratings = [];
    }

    addRating(rating){
      this.ratings.push(rating);
    }
  }
}

/**
 * Chef
 * has an array of string expertises that it can cook()
 *
 *
 *
 * @param expertise {string[]} types of cuisine
 *
 */
class Chef {
	constructor(props) {
		this.expertise = props.expertise;
    console.log(`🦄 ~ Chef ~ constructor ~ this.expertise`, this.expertise);
		this.repertoire = props.repertoire || [];
    console.log(`🦄 ~ Chef ~ constructor ~ this.repertoire`, this.repertoire);
		this.name = props.name;
    console.log(`🦄 ~ Chef ~ constructor ~ this.name`, this.name);

		// create a method for each dish in the repertoire
		this.repertoire.forEach((dish) => {
			this[`_cook${dish}`] = () => {
				console.log(`Here's a ${dish}!`);
			};
		});
	}

	//methods

	/** cook a dish;
	 *
	 * if we can cook the dish -> log "here's a ${dish}"
	 *
	 * else -> log "this is not in the repertoire"
	 *
	 * @param dishName string
	 */
	cook(dishName) {
		const isDishInRepertoire = Boolean(
			this.repertoire.find((name) => {
				return name === dishName;
			})
		);
		// debugger;
		// console.log(
		// 	'🚀 ~ file: chef.js ~ line 67 ~ Chef ~ cook ~ isDishInRepertoire',
		// 	isDishInRepertoire
		// );

		if (!isDishInRepertoire) {
			console.log(`This is not in the repertoire.`);
			return;
		} else {
			// cook it!

			const cookMethod = this[`_cook${dishName}`];

			return cookMethod
				? cookMethod()
				: console.log(`${this.name} can't cook ${dishName} now.`);
		}
	}

	// _cookCaprese() {
	// 	console.log("Here's a caprese!");

	// }

	// _cookPuttanesca() {
	// 	console.log("Here's a puttanesca!");
	// }

	//static methods
	static aveNumOfRepertoire(chefs = []) {
		if (chefs.length === 0) {
			return 0;
		} else {
			let sum = 0;
			for (let chef of chefs) {
				sum += chef.repertoire.length;
			}
			return sum / chefs.length;
		}
	}

	static create(props) {
		return new Chef(props);
	}
}

class ItalianChef extends serializeMixin(ratingMixin(Chef)) {
  constructor(props){
    super(props);
    this.expertise = 'italian';
    this.pastaCount = 0;
  }

  //methods
  preparePasta(){
    this.pastaCount++;
  }

  cook(dishName){ //override parent's method
    if(this.pastaCount === 0){
      console.log('We ran out of pasta!');
    } else {
      super.cook(dishName);
      this.pastaCount--;
    }
  }
}

//instatnce
const tonio = new Chef({
	expertise: 'Italian',
	repertoire: [
		'Caprese',
		'Puttanesca',
		'Lamb back meat with apple sauce',
		'Pudding',
	],
	name: 'Tonio Trasaldi',
});

// const ken = new Chef({
//   expertise: "Chinese",
//   name: "Chen Kenichi",
//   repertoire: ["Mapo Tofu", "Twice Cooked Pork"]
// })

// const tsutomu = new Chef({
//   expertise: "Italian",
//   name: "Tsutomu Ochiai",
//   repertoire: ["Bolognese", "Carbonara", "Minestrone"]
// });

//TEST
// debugger;
//tonio.cook('Lamb back meat with apple sauce');
// tonio.cook("肉じゃが");
// const ave = Chef.aveNumOfRepertoire([tonio, ken, tsutomu]);
// console.log(ave);

// const props = {
//   expertise: "Chinese",
//   name: "Chen Kenichi",
//   repertoire: ["Mapo Tofu", "Twice Cooked Pork"]
// }

// ken = Chef.create(props);
// console.log(ken);

const tsutomu = ItalianChef.create({
  name: "Tsutomu Ochiai",
  repertoire: ["Bolognese", "Carbonara", "Minestrone"]
})

tsutomu.addRating({
  rate: 5,
  message: "It was a great pasta!"
})

console.log(tsutomu.ratings)
