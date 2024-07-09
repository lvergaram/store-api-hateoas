import joyas from '../data/joyas.js';

export const HATEOAS = () => {
  return joyas.map((j) => ({
    name: j.name,
    href: `http://localhost:3000/api/joya/${j.id}`,
  }));
};

export const HATEOASV2 = () => {
  return joyas.map((j) => ({
    joya: j.name,
    src: `http://localhost:3000/api/joya/${j.id}`,
  }));
};

export const orderValues = (order) => {
  return order === 'asc'
    ? joyas.sort((a, b) => a.value - b.value)
    : order === 'desc'
    ? joyas.sort((a, b) => b.value - a.value)
    : [];
};

export const getJoyaById = (id) => {
  return joyas.find((j) => j.id === id);
};

export const fieldsSelect = (joya, fields) => {
  const filterJoya = {...joya}
  const Fields = fields.split(',');
  const properties = Object.keys(filterJoya);
  const check = Fields.every((field) => properties.includes(field));
  
  if (!check) {
    return {
      error: '400 Bad Request',
      message: 'Alguno de los campos que desea consultar no existe dentro del objeto',
    };
  }

  for (let field in filterJoya) {
    if (!Fields.includes(field)) delete filterJoya[field];
  }
  
  return filterJoya;
};

export const filtroCategory = (category) => {
  return joyas.filter((j) => j.category === category);
};
