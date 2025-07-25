import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF } from "@react-three/drei"
import * as THREE from "three"

interface MousePosition {
    x: number
    y: number
}

interface ModelProps {
    url: string
    mousePosition: MousePosition | null
}

function Model({ url, mousePosition }: ModelProps) {
    const { scene } = useGLTF(url)
    const modelRef = useRef<THREE.Group>(null)

    useFrame(() => {
        if (modelRef.current && mousePosition) {
            const targetAngle = Math.atan2(mousePosition.y, -mousePosition.x)
            modelRef.current.rotation.y = THREE.MathUtils.lerp(
                modelRef.current.rotation.y,
                -targetAngle + Math.PI / 2,
                0.05
            )
        }
    })

    return (
        <primitive
            ref={modelRef}
            object={scene}
            scale={1}
            position={[0, 0.5, 0]}
        />
    )
}

export default function App() {
    const [mousePosition, setMousePosition] = useState<MousePosition | null>({ x: 0, y: 0 })

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const x = (e.clientX / window.innerWidth) * 2 - 1
            const y = -(e.clientY / window.innerHeight) * 2 + 1

            setMousePosition({ x: x * 5, y: y * 5 })
        }

        window.addEventListener("mousemove", handleMouseMove)
        return () => window.removeEventListener("mousemove", handleMouseMove)
    }, [])

    return (
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
            <ambientLight intensity={0.9} />
            <directionalLight
                position={[5, 5, 5]}
                intensity={1}
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
                shadow-camera-near={0.5}
                shadow-camera-far={10}
            />
            <hemisphereLight groundColor="#404040" intensity={0.5} />
            {mousePosition && <Model url="../public/scifi_helmet.glb" mousePosition={mousePosition} />}
            <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
    )
}

useGLTF.preload("../public/scifi_helmet.glb")