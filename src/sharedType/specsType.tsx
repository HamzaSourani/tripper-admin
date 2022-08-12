type specsType = {
  id: string;
  name: string;
  place_type_id: string;
  has_multiple_option: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: null | string;
  options: option[];
};
export type option = {
  id: string;
  name: string;
  specs_id: string;
  created_at: string;
  updated_at: string;
  deleted_at: null | string;
};
export default specsType;
