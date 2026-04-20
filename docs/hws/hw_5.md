# Homework 5

!!!warning No jokes this time

    The goal of this homework is for you to gain experience in using gene regulatory network inference methods and to apply them to simulate cell state dynamics.

    **Deadline: Tues, April 28th 2025 11:59pm**

### Background

We have discussed why groups are attempting to engineer cell fate, and various experimental approaches, namely directed differentiation of pluripotent stem cells and direct conversion from one somatic cell type into another. We have also seen how time-consuming and resource-intensive it is to empirically devise experimental protocols to produce a given cell type. Several computational tools have been invented to amerliorate this problem. In general, these methods tend to leverage expression data and regulatory networks to find the most impactful transcription factors (TFs). The overall goal of this homework is for you to get experience with computational methods for cell fate engineering. This will entail reverse engineering gene regulatory networks, and using them to simulate the effects of over-expressing and knocking down TFs on fate outcomes. You will also build on your knowledge of trajectory inference and cell typing to complete this homework.

Your mission is to predict a minimal set of perturbations that allow mouse embryonic stem cells to differentiate to a) nascent mesoderm, and to b) anterior primitive streak/nascent endoderm. To achieve this, you will be asked to reverse engineer the GRN that underpins the differentiation of epiblast to mesoderm or APS/endoderm, and then use this GRN to simulate the fate outcome from perturbing TFs that you select. We have provied a scRNA-seq data set (specifications in [Data](#Data) section) that you are now familar with: it is the mouse embryo data set of epiblast cells, nascent mesoderm, and anterior primitive streak cells. This is the data set that you should use to infer the GRN. Note that we have excluded visceral endoderm cells from this data set. We have also provided a scRNA-seq data set of mouse embryonic stem cells in an undifferentiated state, which should be used to set the initial state of the cells for your simulations.

### Task 1: TF selection

Load and process the gastrulation data. Select 10-15 TFs to use for GRN reconstruction. You can choose to use functions in scFates to identify these TFs, or another approach/method of your choicee. Whichever approach you take, you must describe how you identified these TFs and justify why your choice of method is sound.

### Task 2: Reconstruct gene regulatory network

Use [oneSC](https://onesc.readthedocs.io/en/latest/index.html) to infer the GRN assoicated with the gastrulation data set. You need to limit your analysis to TFs identified in [Task 1](#Task 1), and ensure that the state graph is consistent with what you know about development. If oneSC's state graph conflicts with this, then you should manually define this.


### Task 3: Find minimal TF set

Devise a strategy to predict a minimal set of TFs that, when perturbed in mouse embryonic stem cells, will yield the highest proportion of *late APS* cells. Your method should be based on the GRN you inferred in Task 2, and optionally on the scRNA-seq data provided below. Use the method to generate a set of candidate TFs and then check how your prediction performs by simulating the impact of the perturbation using oneSC. You should compare the performance of your method to a judiciously chosen baseline method.

Now apply your method to predict TFs to perturb in mESCs to yield the highest proportion of nascent *late mesoderm* cells. Evaluate your predictions as above (i.e. perform simulations with your perturbations, qunatify cell type numbers, and compare to results using a baseline method). 

Did your method outperform the baseline method? Discuss why or why not.


### Data

#### List of mouse transcription factors:
- [allTFs_mm_aertslab_011924.txt](https://jhu.instructure.com/files/13616012)


#### scRNA-seq data of mouse gastrulation embryonic cells
- [h5ad: adHW5_2026_EpiMesoAPS_n500.h5ad](https://jhu.instructure.com/courses/112401/files/folder/data?preview=17864563)
- Includes only APS, nascent mesoderm, and epiblast cells
- We have already performed cell quality control. You should perform gene quality control and standard downstream processing before selecting TFs and inferring GRN. .obs['t'] holds pseudotime, and .obs['cluster'] has cell type annotation.

#### scRNA-seq data of pluripotent mouse embryonic stem cells
- [h5ad: adHW5_mESC.h5ad](https://jhu.instructure.com/courses/112401/files/folder/data?preview=17864578)



