export async function resolve(specifier, context, next) {
	const nextResult = await next(specifier, context);

	if (!specifier.endsWith(".styl")) return nextResult;

	return {
		format: "styl",
		shortCircuit: true,
		url: nextResult.url,
	};
}

export async function load(url, context, next) {
	if (context.format !== "styl") return next(url, context);

	return {
		format: "module",
		shortCircuit: true,
		source: "",
	};
}
