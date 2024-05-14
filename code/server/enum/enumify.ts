function enumify(enumObj: any): string {
  const enumValues = Object.values(enumObj);
  const enumString = enumValues.map(value => `'${value}'`).join(', ');
  return enumString;
}

export default enumify;