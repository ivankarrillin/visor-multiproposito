export default {
    

    dif_catastro_censo:'hot_spot',
    mz_uso_viv: 'col4',
    mz_uso_mix: 'col5',
    mz_uso_res: 'col6',
    razon_unidades_seccion:'razon_unidades',
    
    series:[0,0,0,0,0],
    col4: {
        rangos: [0, 20, 50, 75, 90, 100],
        colores: ['#FFF8C7', '#A2D784', '#69B8CB', '#3B85B2', '#0C457D'],
        labels: ['<20%', '20-50%', '50-75%', '75-90%', '>90%'],
        titulo: "Conteo de unidades de uso de vivienda",
        columna:4
    },
    col5: {
        rangos:  [0, 1, 3, 6, 10, 100],
        colores: ['#FEF3A3', '#852800', '#C64913', '#E4855B', '#EABF77'],
        labels: ['<1%', '1-3%', '3-6%', '6-10%', '>10%'],
        titulo: "Conteo de unidades de uso de mixto",
        columna:5
        
    },
    col6: {
        rangos: [0, 10, 25, 50, 80, 100],
        colores: ['#7D0061', '#B62082', '#CE558E', '#DF95B8', '#FFECFE'],
        labels: ['<10%', '10-25%', '25-50%', '50-80%', '>80%'],
        titulo: "Conteo de unidades de uso no residencial",
        columna:6
        
    },
    hot_spot: {
        rangos: [0,0, 0.85, 1, 1.36, 1056],
        colores: ['#1B4F72', '#2E86C1', '#AED6F1', '#F5B7B1', '#E74C3C'],
        labels: ['0%', '0.85%', '1%', '1.36%', '>1.36%'],
        titulo: "Diferencia porcentual del censo vs catastro",
        columna:4
    },
    razon_unidades: {
        rangos: [-10000,1, 1.5, 2, 3,100000],
        colores: ['#F3CE7E', '#F3B876', '#F39676', '#F57465', '#C64B4B'],
        labels: ['Menor a 1', '1.1 a 1.5', '1.6 a 2', '2.1 a 3', 'Mayor a 3'],
        titulo: "Razón Unidades Censales por predio",
        columna:5
    }



}

