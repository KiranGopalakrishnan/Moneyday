import mondaySdk from 'monday-sdk-js'

const monday = mondaySdk()
monday.setToken(
    'eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjU2Njg4ODUyLCJ1aWQiOjEzNzc0OTg5LCJpYWQiOiIyMDIwLTA3LTA0VDIxOjU5OjMxLjAwMFoiLCJwZXIiOiJtZTp3cml0ZSJ9._fhfnB2SnjXyTjH2fL0LxxLLu4KkBxJ89lZnrK0Vp6M'
)
class Monday {
    getInstance() {
        return monday
    }
    api(query: string) {
        return monday.api(query).then((res: { data: any }) => res.data)
    }
}

export { Monday }
