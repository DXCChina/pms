class TestCase {
  id: number;
  name: string;
  detail: string;
  demandId: number;
  expect: string;
  input: string;
  ownerId: number;
  projectId: number;
  releaseId: number;
  type: string;
}

export class TestSet {
  id: number;
  name: string;
  detail: string;
  case: any;
  member: string;
  memberId: number;
  projectId: number;
  releaseId: number;
}
