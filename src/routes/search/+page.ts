import { graphql  } from '$houdini'
// import type { PageLoad } from './$types';

export const _houdini_load = graphql(`
   query CarsById($_id: CarQueryInput) {
	car(query: $_id) {
	_id
	approved
	brand
	combustible
	driveType
	expirationDate
	exteriorColor
	images
	interiorColor
	kilometers
	model
	ownerInformation {
	id
	name
	phone
	email
	}
	passengers
	plaqueNumber
	price
	publishDate
	sunroof
	transmission
	type
	year
	}
	}
`)


export const _CarsByBrandVariables = ( { url} ) => {
    const brand = url.searchParams.get('brand')
	return {
		_id : "657b2fd3d967592642d2446a"
	    }
    
    
}