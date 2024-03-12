import React from 'react'

const ProductTableComponent = () => {
  return (
    <table className="w-full text-center">
      <thead>
        <tr className="bg-gray-800 text-white">
          <th className="px-4 py-2">Nombre</th>
          <th className="px-4 py-2">Column 2</th>
          <th className="px-4 py-2">Column 3</th>
          <th className="px-4 py-2">Column 3</th>
          <th className="px-4 py-2">Column 3</th>
          <th className="px-4 py-2">Column 3</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="border px-4 py-2">Row 1, Column 1</td>
          <td className="border px-4 py-2">Row 1, Column 2</td>
          <td className="border px-4 py-2">Row 1, Column 3</td>
          <td className="border px-4 py-2">Row 1, Column 3</td>
          <td className="border px-4 py-2">Row 1, Column 3</td>
          <td className="border px-4 py-2">Row 1, Column 3</td>
        </tr>
        <tr>
          <td className="border px-4 py-2">Row 2, Column 1</td>
          <td className="border px-4 py-2">Row 2, Column 2</td>
          <td className="border px-4 py-2">Row 1, Column 3</td>
          <td className="border px-4 py-2">Row 1, Column 3</td>
          <td className="border px-4 py-2">Row 1, Column 3</td>
          <td className="border px-4 py-2">Row 2, Column 3</td>
        </tr>
        <tr>
          <td className="border px-4 py-2">Row 3, Column 1</td>
          <td className="border px-4 py-2">Row 3, Column 2</td>
          <td className="border px-4 py-2">Row 1, Column 3</td>
          <td className="border px-4 py-2">Row 1, Column 3</td>
          <td className="border px-4 py-2">Row 1, Column 3</td>
          <td className="border px-4 py-2">Row 3, Column 3</td>
        </tr>
      </tbody>
    </table>
  )
}

export default ProductTableComponent