'use client'

import L from 'leaflet'
import MarkerIcon from '../node_modules/leaflet/dist/images/marker-icon.png'
import MarkerShadow from '../node_modules/leaflet/dist/images/marker-shadow.png'
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useEffect, useState } from 'react'
import './components.css'
import {users} from './data-example/dosen'
import {buildings} from './data-example/bangunan'
import { RiDropdownList } from 'react-icons/ri'


const Map = () => {
    const [coordi, setCoordi] = useState<[number, number]>([1.41756, 124.98394])
    const [searchTerm, setSearchTerm] = useState('')
    const [searchResult, setSearchResult] = useState<(User | Building)[]>([])
    const [searchType, setSearchType] = useState<'users' | 'buildings' | 'all'>('users')

    
    const handleShowAll = () => {
        setSearchResult([...users, ...buildings])
    }

    const handleShowAllUsers = () => {
        setSearchType('users')
        setSearchResult(users)
    }

    const handleShowAllBuildings = () => {
        setSearchType('buildings')
        setSearchResult(buildings)
    }

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(searchType === 'buildings') {
            setSearchTerm(event.target.value)
            const filteredBuildings = buildings.filter(building => building.name.toLowerCase().includes(event.target.value.toLowerCase()))
            setSearchResult([...filteredBuildings])
        } else if(searchType === 'users'){
            setSearchTerm(event.target.value)
            const filteredUsers = users.filter(user => user.name.toLowerCase().includes(event.target.value.toLowerCase()))
            setSearchResult([...filteredUsers])
        }else if (searchType === 'all') {
            setSearchTerm(event.target.value)
            const filteredAll = [...users, ...buildings].filter(item => item.name.toLowerCase().includes(event.target.value.toLowerCase()))
            setSearchResult([...filteredAll])
        }
    }

    useEffect(() => {
        handleShowAll()
        setSearchType('all')
    }, [])
    
    return (
        <div>
            <form>
                <input className="search-box" type="text" value={searchTerm} onChange={handleSearch} placeholder="Search" />
            </form>

            <nav className="navbar flexBetween max-container padding-container relative z-30 py-5">
                <ul className="nav-items hidden h-full gap-12 lg:flex">
                    <li className="font-bold nav-button" onClick={handleShowAll}>
                        <button className="btn-gedung btn btn-primary" ><span>Lingkungan UNKLAB</span></button>
                    </li>
                    <li className="font-bold nav-button" onClick={handleShowAllBuildings}>
                        <button className="btn-gedung btn btn-primary" ><span>Gedung Kuliah</span></button>
                    </li>
                    <li className="font-bold nav-button"  onClick={handleShowAllUsers}>
                        <button className="btn-rumah btn btn-primary"><span>Rumah Dosen </span></button>
                    </li>
                </ul>
            </nav>

            <MapContainer className='maps-main' center={coordi} zoom={17} scrollWheelZoom={true} touchZoom={true} doubleClickZoom={true}>
                <TileLayer className='tile-layer'
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {searchResult.map((item, index) => (
                    <Marker key={index} position={item.coordi} icon={
                        new L.Icon({
                            iconUrl: MarkerIcon.src,
                            iconRetinaUrl: MarkerIcon.src,
                            iconSize: [25, 41],
                            iconAnchor: [12.5, 41],
                            popupAnchor: [0, -41],
                            shadowUrl: MarkerShadow.src,
                            shadowSize: [41, 41],
                        })
                    }>
                        <Popup className='font-bold text-xl'>
                            No : {item.noRumah} <br />
                            {item.name}
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>

        </div>
    )
}


export default Map