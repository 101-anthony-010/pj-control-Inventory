import React from 'react';

const Formato = () => {
  return (
    <div className="bg-white w-full h-full p-6 rounded-lg shadow-md border-t-4 border-blue-500">
      <h2 className="text-2xl font-bold mb-4">Documento del Poder Judicial</h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Fecha:</label>
        <p className="text-gray-800">10 de abril de 2024</p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Asunto:</label>
        <p className="text-gray-800">Sentencia Judicial</p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Magistrado:</label>
        <p className="text-gray-800">Nombre del Magistrado</p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Demandante:</label>
        <p className="text-gray-800">Nombre del Demandante</p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Demandado:</label>
        <p className="text-gray-800">Nombre del Demandado</p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Resolución:</label>
        <p className="text-gray-800">Se dicta la siguiente resolución...</p>
      </div>
      <div className="mt-8">
        <label className="block text-gray-700 text-sm font-bold mb-2">Firma del Magistrado:</label>
        <div className="border-t border-gray-400 pt-2">
          <p className="text-gray-800">Nombre y Firma</p>
        </div>
      </div>
      <div className="mt-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Sello del Tribunal:</label>
        <img src="ruta/del/sello.png" alt="Sello del Tribunal" className="w-32 h-32 object-contain" />
      </div>
    </div>
  );
};

export default Formato;
