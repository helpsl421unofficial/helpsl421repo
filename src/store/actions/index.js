/**
 *  ========================================
 *  ============ Authentication ============
 *  ========================================
 */
export {
  authenticationFirebase,
  signOutFirebase,
  authCheckState
} from "./firebaseAuthAction";

/**
 *  ========================================
 *  =========== Database - CURD ============
 *  ========================================
 */
export { addNewPost, getDataFirebase } from "./firebaseDatabaseAction";

/**
 *  ========================================
 *  ================ UI ================
 *  ========================================
 */

export {
  uiStartLoading,
  uiStopLoading,
  uiSetStatus,
  uiSetLoading,
  uiIsModalOpen,
  setExamTime,
  setModalTrigger
} from "./uiAction";
