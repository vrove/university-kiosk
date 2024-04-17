'use client'

import BackButton from "@/components/BackButton"
import Image from 'next/image'
import { useEffect, useState } from "react";
import './viewBuildings.css'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl ?? '', supabaseKey ?? '')

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
            const fetchBuilding = async () => {
                const { data, error } = await supabase
                    .from('buildings')
                    .select('*')
                    .eq('id', params.buildingsId)
                if (error) console.error('Error:', error)
                else setBuilding(data[0] as BuildingType)
            }
            fetchBuilding()
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