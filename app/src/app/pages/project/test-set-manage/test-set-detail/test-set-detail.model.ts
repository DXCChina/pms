class TestCase {
  id: number;
  name: string;
  detail: string;
  type: string;
}

export class TestSet {
  id: number;
  name: string;
  detail: string;
  case: TestCase[];
  member: string;
  memberId: number;
  projectId: number;
  releaseId: number;
}
