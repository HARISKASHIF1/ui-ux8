import { myAxios } from "./helper"


export const getCarComparison = async (car1, car2, car1Model, car2Model) => {
    return myAxios.get(`/carComparison?car1=${car1}&car2=${car2}&model1=${car1Model}&model2=${car2Model}`).then(response => response.data)
}
export const getCarPollution = async(carMake,carModel) =>{
    return myAxios.get(`/carDescription/pollution?make=${carMake}&model=${carModel}`);
}