import { z } from 'zod';

const password = z
	.string({
		required_error: 'El campo de contraseña es requerido.',
		invalid_type_error: 'El campo de contraseña debe ser texto con un formato válido.'
	})
	.min(8, {
		message: 'El campo debe tener al menos 8 carateres.'
	}
);

const email = z
	.string({
		required_error: 'El campo de email es requerido.',
		invalid_type_error: 'El campo de email debe ser texto con un formato válido.'
	})
	.email({
		message: 'La dirección de correo electrónico debe tener un formato válido.'
	})
	.min(4, { message: 'El campo debe tener al menos 4 carateres.' 
	}
);

export const registerSchema = z
	.object({
		email,
		password,
		passwordConfirmation: password
	})
	.refine((data) => data.password === data.passwordConfirmation, {
		message: 'Las contraseñas no coinciden.',
		path: ['passwordConfirmation']
	}
);

export const loginSchema = z
	.object({
		email,
		password,
	}
)

export const emailSchema = z.object({email})
