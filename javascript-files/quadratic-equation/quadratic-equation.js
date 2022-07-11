function discriminant(a, b, c) {
	return b**2 - 4*a*c;
}

function quadrEquation(a, b, c) {
	// Linear equation cases
	if (a == 0 && b == 0 && c == 0) {
		return "Real numbers.";
	}
	else if (a == 0 && b == 0) {
		return "No solutions.";
	}
	else if(a == 0)
	{
		return (-c / b);
	}
	// Quadratic equation cases
	else
	{
		let D = discriminant(a, b, c);
		if(D < 0)
		{
			return "No solutions.";
		}

		D = Math.sqrt(D);

		if(D == 0)
		{
			return (-b / (2 * a));
		}

		if(D > 0)
		{
			return [(-b + D) / (2 * a), (-b - D) / (2 * a)];
		}
	}

}

module.exports = { quadrEquation };
