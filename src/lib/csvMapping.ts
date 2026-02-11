// Mapping from Question ID to SPSS CSV Header
export const QUESTION_ID_TO_HEADER_MAP: Record<string, string> = {
    // Demographics
    "age": "age",
    "gender": "gender",
    "height": "ht.m2",
    "weight": "wt.kg",
    "bmi": "BMI.kgm2",

    // Work History
    "wh_q1": "activity.hours.per.day",
    "wh_q2": "experience.in.years",
    "wh_q3": "most.frequent.activities",
    "wh_q4": "mainly.used.wrist",

    // Set A - Right Hand
    "sq_a_rh_1": "mhq.RH.work",
    "sq_a_rh_2": "mhq.right.fingers.move",
    "sq_a_rh_3": "mhq.right.wrist.move",
    "sq_a_rh_4": "mhq.RH.strength",
    "sq_a_rh_5": "mhq.RH.sensation",

    // Set A - Left Hand
    "sq_a_lh_1": "mhq.LH.work",
    "sq_a_lh_2": "mhq.left.fingers.move",
    "sq_a_lh_3": "mhq.left.wrist.move",
    "sq_a_lh_4": "mhq.LH.strength",
    "sq_a_lh_5": "mhq.LH.sensation",

    // Set B - Right Hand
    "sq_b_rh_1": "mhq.RH.turn.knob",
    "sq_b_rh_2": "mhq.RH.pick.coin",
    "sq_b_rh_3": "mhq.RH.hold.glass",
    "sq_b_rh_4": "mhq.RH.turn.key",
    "sq_b_rh_5": "mhq.RH.hold.pan",

    // Set B - Left Hand
    "sq_b_lh_1": "mhq.LH.turn.knob",
    "sq_b_lh_2": "mhq.LH.pick.coin",
    "sq_b_lh_3": "mhq.LH.hold.glass",
    "sq_b_lh_4": "mhq.LH.turn.key",
    "sq_b_lh_5": "mhq.LH.hold.pan",

    // Set B - Both Hands
    "sq_b_bh_1": "mhq.BH.open.jar",
    "sq_b_bh_2": "mhq.BH.button.shirt",
    "sq_b_bh_3": "mhq.BH.eat.spoon",
    "sq_b_bh_4": "mhq.BH.carry.bag",
    "sq_b_bh_5": "mhq.BH.wash.dishes",
    "sq_b_bh_6": "mhq.BH.wash.hair‎",
    "sq_b_bh_7": "mhq.BH.tie.knots",

    // Section C
    "sq_c_1": "mhq.unable.to.work",
    "sq_c_2": "mhq.shorten.work.day",
    "sq_c_3": "mhq.take.easy",
    "sq_c_4": "mhq.accomplish.less",
    "sq_c_5": "mhq.longer.to.do.task",

    // Section D
    "sq_d_1": "mhq.pain",
    "sq_d_2": "mhq.pain.type",
    "sq_d_3": "mhq.interfere.sleep",
    "sq_d_4": "mhq.interfere.ADLs",
    "sq_d_5": "mhq.unhappy",

    // Section E - Right Hand
    "sq_e_rh_1": "mhq.RH.appearance",
    "sq_e_rh_2": "mhq.RH.uncomfortable",
    "sq_e_rh_3": "mhq.RH.depressed",
    "sq_e_rh_4": "mhq.RH.social.activities",

    // Section E - Left Hand
    "sq_e_lh_1": "mhq.LH.appearance",
    "sq_e_lh_2": "mhq.LH.uncomfortable‎",
    "sq_e_lh_3": "mhq.LH.depressed",
    "sq_e_lh_4": "mhq.LH.social.activities",

    // Section F - Right Hand
    "sq_f_rh_1": "mhq.RH.function",
    "sq_f_rh_2": "mhq.RH.fingers.motion",
    "sq_f_rh_3": "mhq.RH.wrist.motion",
    "sq_f_rh_4": "mhq.RH.wrist.strength",
    "sq_f_rh_5": "mhq.RH.pain",
    "sq_f_rh_6": "mhq.RH.sense",

    // Section F - Left Hand
    "sq_f_lh_1": "mhq.LH.function",
    "sq_f_lh_2": "mhq.LH.fingers.motion",
    "sq_f_lh_3": "mhq.LH.wrist.motion",
    "sq_f_lh_4": "mhq.LH.wrist.strength",
    "sq_f_lh_5": "mhq.LH.pain",
    "sq_f_lh_6": "mhq.LH.sense",
};

export const CSV_HEADERS_ORDER = [
    "age", "gender", "ht.m2", "wt.kg", "BMI.kgm2", "activity.hours.per.day", "experience.in.years",
    "most.frequent.activities", "mainly.used.wrist", "mhq.RH.work", "mhq.right.fingers.move",
    "mhq.right.wrist.move", "mhq.RH.strength", "mhq.RH.sensation", "mhq.LH.work",
    "mhq.left.fingers.move", "mhq.left.wrist.move", "mhq.LH.strength", "mhq.LH.sensation",
    "mhq.RH.turn.knob", "mhq.RH.pick.coin", "mhq.RH.hold.glass", "mhq.RH.turn.key", "mhq.RH.hold.pan",
    "mhq.LH.turn.knob", "mhq.LH.pick.coin", "mhq.LH.hold.glass", "mhq.LH.turn.key", "mhq.LH.hold.pan",
    "mhq.BH.open.jar", "mhq.BH.button.shirt", "mhq.BH.eat.spoon", "mhq.BH.carry.bag", "mhq.BH.wash.dishes",
    "mhq.BH.wash.hair‎", "mhq.BH.tie.knots", "mhq.unable.to.work", "mhq.shorten.work.day", "mhq.take.easy",
    "mhq.accomplish.less", "mhq.longer.to.do.task", "mhq.pain", "mhq.pain.type", "mhq.interfere.sleep",
    "mhq.interfere.ADLs", "mhq.unhappy", "mhq.RH.appearance", "mhq.RH.uncomfortable", "mhq.RH.depressed",
    "mhq.RH.social.activities", "mhq.LH.appearance", "mhq.LH.uncomfortable‎", "mhq.LH.depressed",
    "mhq.LH.social.activities", "mhq.RH.function", "mhq.RH.fingers.motion", "mhq.RH.wrist.motion",
    "mhq.RH.wrist.strength", "mhq.RH.pain", "mhq.RH.sense", "mhq.LH.function", "mhq.LH.fingers.motion",
    "mhq.LH.wrist.motion", "mhq.LH.wrist.strength", "mhq.LH.pain", "mhq.LH.sense"
];
