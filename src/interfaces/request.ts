interface errorMessage{
    statusCode: number
    message: string
    body: any
}

interface UserRequest {
    id?: number;
    email: string;
    name?: string | null;
    password: string;
  }
  
  interface EmployeeRequest {
    id?: number;
    name: string;
    userId?: number | null;
    jobId?: number | null;
    branchOfficeId?: number | null;
    salary: number;
    isActive: boolean;
  }
  
  interface JobTypeRequest {
    id?: number;
    name: string;
    description: string;
  }
  
  interface JobRequest {
    id?: number;
    name: string;
    description: string;
    jobTypeId: number;
    baseSalary: number;
  }
  
  interface OrderStatusRequest {
    id?: number;
    name: string;
    description: string;
  }
  
  interface OrderRequest {
    id?: number;
    date: Date;
    total: number;
    email: string;
    client: string;
    address: string;
    phone: string;
    description: string;
    orderStatusId?: number | null;
  }
  
  interface PackageRequest {
    id?: number;
    name: string;
    weight: number;
    cost: number;
    total: number;
    hight: number;
    widht: number;
    orderId?: number | null;
  }
  
  interface BranchOfficeRequest {
    id?: number;
    address: string;
    isActive: boolean;
    cityId: number;
  }
  
  interface CityRequest {
    id?: number;
    name: string;
    departmentId?: number | null;
  }
  
  interface DepartmentRequest {
    id?: number;
    name: string;
  }
  
  interface PathRequest {
    id?: number;
    name: string;
    routeId: number;
    originId: number;
    destinationId: number;
  }
  
  interface RouteRequest {
    id?: number;
    name: string;
    priceWeight: number;
    originId: number;
    destinationId: number;
    isActive: boolean;
  }
  