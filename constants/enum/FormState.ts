const FormState = {
  IDLE: 'IDLE',
  SENDING: 'SENDING',
  SENT: 'SENT',
} as const;

type FormState = keyof typeof FormState;

export default FormState;
