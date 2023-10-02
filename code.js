//helpers

function set_cookie(name, value, expirationDays) {
  const date = new Date();
  date.setTime(date.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function get_cookie(name) {
  const cookies = document.cookie.split("; ");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].split("=");
    if (cookie[0] === name) {
      return cookie[1];
    }
  }
  return "";
}

function random_number() {
	
	var randomNumber = Math.random() * 10;
	
	return randomNumber;

}

// experiment

function new_experiment(id, name = null) {

	var exp = get_cookie("mm_exp_id");
	var exp_id = exp.split(".")[0];
	var variant = exp.split(".")[1];

	if (exp_id !== id) {

		if (random_number()<=5) {
			
			var variant = 0;
		
		} else {
		
			var variant = 1;
		
		}

		set_cookie("mm_exp_id", id+"."+variant, 365);

	}

	

	if (typeof gtag !== 'undefined') {
  	gtag("event", "experiment_impression", {
  		experiment_id: id,
  		experiment_variant: variant,
  		experiment_name: name
  	})
	} else {
		dataLayer.push({
			event: "experiment_impression",
			experiment_id: id,
			experiment_variant: variant,
			experiment_name: name
		});	
	}


	

	if (variant=='0') {
		if (typeof experiment_original !== 'undefined') {
			console.log('test0');
			experiment_original();
		}
	}

	if (variant=='1') {
		console.log('test1');
		experiment_changes();
	}
}
