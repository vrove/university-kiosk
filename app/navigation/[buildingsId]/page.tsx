'use client'

import BackButton from "@/components/BackButton"
import Image from 'next/image'
import { useEffect, useState } from "react";
import './viewBuildings.css'

type BuildingType = {
    name: string;
    links: string;
}

export default function BuildingView ({params}:
    {
        params: {
            buildingsId: string
        };
    }){
        const [building, setBuilding] = useState<BuildingType | null>(null)

        useEffect(() => {
            fetch('http://localhost:5500/api/buildings/' + params.buildingsId)
            .then(response => response.json())
            .then(data => setBuilding(data))
            .catch(error => console.error('Error:', error))
        }, [params.buildingsId])

        return(
            <div className="build-view-container">
                {building && (
                    <>
                        <h1 className="build-view-name">{building.name}</h1>
                        <div className="build-view-img" >
                            <Image src={building.links} alt="building" width={1500} height={1500}/>
                        </div>                
                        <BackButton to="/navigation"/>
                    </>
                )}
            </div>
        )
    }