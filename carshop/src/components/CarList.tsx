import {useEffect, useState} from 'react';
import { AgGridReact} from 'ag-grid-react';
import {AllCommunityModule, ModuleRegistry, ColDef} from 'ag-grid-community';

type Car = {
    brand: string;
    model: string;
    color: string;
    fuel: string;
    modelYear: number;
    price: number;
}

ModuleRegistry.registerModules([AllCommunityModule]);

export default function CarList() {
    const [cars, setCars] = useState<Car[]>([]);

    const [columnDefs] = useState<ColDef<Car>[]> ([
        {field: "brand"},
        {field: "model"},
        {field: "color"},
        {field: "fuel"},
        {field: "modelYear"},
        {field: "price"},
    ]);

    useEffect(() => {
        fetch('https://car-rest-service-carshop.2.rahtiapp.fi/cars')
        .then(response => {
            if (!response.ok) 
                throw new Error ("Error when fetching cars");
            return response.json();
        })
        .then(data => setCars(data._embedded.cars))
        .catch(err => console.error(err));
    }, []);
    return(
        <>
          <div style={{width: '90%', height: 500}}>
          <AgGridReact
            rowData={cars}
            columnDefs={columnDefs}
          />
          </div>
        </>
    )
}