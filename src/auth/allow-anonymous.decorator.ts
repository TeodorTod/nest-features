export const AllowAnonymous = () => {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        console.log('Allow anonymous', target, propertyKey, descriptor);
    }
};
