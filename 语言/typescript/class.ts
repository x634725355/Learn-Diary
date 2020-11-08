{
	class Lady {
		content = "Hi, Handsome guy";
		sayHello() {
			return this.content;
		}
	}

	let goddess = new Lady();
	console.log(goddess);

	
	class Sister extends Lady {
		sayLove() {
			return "I love You";
		}
	}

	let goddess1 = new Sister();

	console.log(goddess1.sayHello(), goddess1.sayLove());
	

}

